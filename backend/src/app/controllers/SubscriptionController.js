import { Op } from 'sequelize';
import User from '../models/User';
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
    const subscription = await Subscription.findAll({
      where: {
        user_id: user_logged,
      },
      include: [
        {
          model: Meetap,
          where: {
            date: {
              // gt significa '>'
              [Op.gt]: new Date(),
            },
          },
          required: true,
        },
      ],
      order: [[Meetap, 'date']],
    });

    return res.json(subscription);
  }

  async store(req, res) {
    const user = await User.findByPk(req.userId);
    const meetup = await Meetap.findByPk(req.params.idMeetup, {
      include: [User],
    });

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
}

export default new SubscriptionController();
