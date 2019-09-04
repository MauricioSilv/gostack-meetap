import { startOfDay, endOfDay, parseISO, isBefore } from 'date-fns';
import { Op } from 'sequelize';
import * as Yup from 'yup';
import Meetap from '../models/Meetap';
import User from '../models/User';
import File from '../models/File';

class MeetapController {
  async index(req, res) {
    const get = {};
    const page = req.query.page || 1;

    if (req.query.date) {
      const newDate = parseISO(req.query.date);

      get.date = {
        [Op.between]: [startOfDay(newDate), endOfDay(newDate)],
      };
    }

    const meetups = await Meetap.findAll({
      get,
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
      limit: 10,
      offset: 10 * page - 10,
    });

    return res.json(meetups);
  }

  async store(req, res) {
    const { title, img_id, description, place, date } = req.body;
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      img_id: Yup.number().required(),
      description: Yup.string().required(),
      place: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failss' });
    }

    const user_id = req.userId;
    const newDate = parseISO(date);

    if (isBefore(newDate, new Date())) {
      return res.status(401).json({ error: 'Invalid date' });
    }

    const { id } = await Meetap.create({
      title,
      description,
      place,
      date,
      img_id,
      user_id,
    });

    const newMeetup = await Meetap.findByPk(id, {
      include: [
        { model: File, as: 'banner', attributes: ['id', 'url', 'path'] },
      ],
    });

    return res.json(newMeetup);
  }

  async update(req, res) {
    const id_logged = req.userId;
    const schema = Yup.object().shape({
      title: Yup.string(),
      img_id: Yup.number(),
      description: Yup.string(),
      place: Yup.string(),
      date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }
    // pegando o id do meetap no banco
    const meetap = await Meetap.findByPk(req.params.id);

    if (meetap.user_id !== id_logged) {
      return res.status(401).json({ error: 'Not authorized.' });
    }

    const newDate = parseISO(req.body.date);
    // verificando se a data é antes do dia atual
    if (isBefore(newDate, new Date())) {
      return res.status(401).json({ error: 'Invalid date' });
    }

    if (meetap.past) {
      return res.status(401).json({ error: "Can't update past meetups." });
    }

    // salvando a atualização
    const { id } = await meetap.update(req.body);

    // pegando os valores atualizados
    const updateMeetup = await Meetap.findByPk(id, {
      include: [
        { model: File, as: 'banner', attributes: ['id', 'url', 'path'] },
      ],
    });

    return res.json(updateMeetup);
  }

  async delete(req, res) {
    const user_logged = req.userId;
    const meetap = await Meetap.findByPk(req.params.id);

    if (meetap.user_id !== user_logged) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    // verificando se a meetap não passou
    if (meetap.past) {
      return res.status(401).json({ error: "Can't delete past meetups." });
    }

    // apagando o resgistro
    await meetap.destroy();

    return res.send();
  }
}

export default new MeetapController();
