const express = require("express");
const app = express();
const Sequelize = require("sequelize");
const sequelize = require("./models");

app.use(express.json());
const sequelize = new Sequelize("usuarios_db", "root", "Lipe@9182", {
  host: "localhost",
  dialect: "mysql",
});

sequelize.sync({ alter: true });
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

app.listen(3000, () => {
  console.log("API rodando na porta 3000");
});
