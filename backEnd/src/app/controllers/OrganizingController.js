import Meetap from '../models/Meetap';

class OrganizingController {
  async index(req, res) {
    // pegando os meetups do usuario logado
    const meetups = await Meetap.findAll({ where: { user_id: req.userId } });

    return res.json(meetups);
  }
}

export default new OrganizingController();
