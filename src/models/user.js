const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const hash = bcrypt.hashSync(value, 10);
        this.setDataValue("senha", hash);
      },
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
  }
);

module.exports = User;