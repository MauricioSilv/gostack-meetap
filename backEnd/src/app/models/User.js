import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  // aqui recebe a connection
  // esses campos n precisa ser igual ao bd
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    // ação antes de salvar o model
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.hasMany(models.Meetap);
    this.hasMany(models.Subscription);
  }

  // verificando se o password e igual; return bool
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
