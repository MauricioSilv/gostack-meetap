import Sequelize, { Model } from 'sequelize';
import { isBefore } from 'date-fns';

class Meetap extends Model {
  // aqui recebe a connection
  // esses campos n precisa ser igual ao bd
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        place: Sequelize.STRING,
        date: Sequelize.DATE,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    // this.hasMany(models.Subscription, { foreignKey: 'meetap_id' });
    this.belongsTo(models.File, { foreignKey: 'img_id', as: 'banner' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner' });
  }
}

export default Meetap;
