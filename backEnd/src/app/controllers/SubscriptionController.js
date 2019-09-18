// import { Op } from 'sequelize';
import { isBefore } from 'date-fns';
import User from '../models/User';
import File from '../models/File';
import Subscription from '../models/Subscription';
import Meetap from '../models/Meetap';
import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';

class SubscriptionController {
  async index(req, res) {
    // pegando o usuario logado
    const user_logged = req.userId;
    /**
     * Condiçao pra listar meetaps que ainda nao passaram
     */
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: user_logged,
      },
      include: [
        {
          model: Meetap,
          as: 'meetup',
          attributes: ['id', 'title', 'description', 'place', 'date'],
          include: [
            {
              model: User,
              as: 'owner',
              attributes: ['id', 'name', 'email'],
            },
            {
              model: File,
              as: 'banner',
              attributes: ['id', 'url', 'path'],
            },
          ],
        },
      ],
      order: [['meetup', 'date']],
    });

    return res.json(
      subscriptions.filter(sub =>
        isBefore(new Date(), new Date(sub.meetup.date))
      )
    );
  }

  async store(req, res) {
    const user = await User.findByPk(req.userId);
    const meetup = await Meetap.findByPk(req.params.idMeetup);

    // check usario logado != user meetap
    if (meetup.user_id === req.userId) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to you own meetups" });
    }
    // check se date isBefore
    if (meetup.past) {
      return res.status(400).json({ error: "Can't subscribe to past meetups" });
    }

    const checkDate = await Subscription.findOne({
      where: {
        user_id: user.id,
      },
      include: [
        {
          model: Meetap,
          as: 'meetup',
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (checkDate) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to two meetups at the same time" });
    }

    const subscrition = await Subscription.create({
      user_id: user.id,
      meetap_id: meetup.id,
    });

    /**
     * aqui envia o email
     */
    Queue.add(SubscriptionMail.key, {
      user,
      meetup,
    });

    return res.json(subscrition);
  }

  async destroy(req, res) {
    const { meetUpId } = req.params;

    const meetUp = Meetap.findByPk(meetUpId);
    const subscription = await Subscription.findOne({
      where: { user_id: req.userId, meetap_id: meetUpId },
    });

    if (!subscription) {
      return res.status(404).json({
        error: `Subscription to MeetUp with id ${meetUpId} not found.`,
      });
    }

    if (isBefore(new Date(meetUp.date), new Date())) {
      return res.status(400).json({
        error: "You can't cancel the subscription of past MeetUps.",
      });
    }

    Subscription.destroy({ where: { meetap_id: meetUpId } });

    return res.json({
      error: `Subscription to meetup with id ${meetUpId} was deleted.`,
    });
  }
}
export default new SubscriptionController();
