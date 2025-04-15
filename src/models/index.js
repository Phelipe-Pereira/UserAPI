const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('usuarios_db', 'root', 'Lipe@9182', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // opcional: remove os logs SQL no terminal
});

module.exports = sequelize;
