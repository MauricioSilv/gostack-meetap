import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import File from '../app/models/File';
import User from '../app/models/User';
import Meetap from '../app/models/Meetap';
import Subscription from '../app/models/Subscription';

const models = [User, File, Meetap, Subscription];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // conexão com a base de dados
    this.connection = new Sequelize(databaseConfig);

    // passando a conexão para o model
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  // associate() {
  //   models.forEach(model => {
  //     if (model.associate) {
  //       model.associate(this.connection.models);
  //     }
  //   });
  // }
}

export default new Database();
