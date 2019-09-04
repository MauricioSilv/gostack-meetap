// configurações do banco sequelize
module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'meetap',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
