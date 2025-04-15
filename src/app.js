const express = require("express");
const path = require("path");

const app = express();

const sequelize = require("./models");
const User = require("./models/user");
const router = require("./routes/router");
const methodOverride = require("method-override");
const engine = require('ejs-mate');

app.engine('ejs', engine);
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const usuarios = await User.findAll();
  res.render("index", { title: "Usuários", usuarios });
});

app.use(router);

sequelize.sync({ alter: true });
sequelize.authenticate()
  .then(() => console.log("Conectado ao banco!"))
  .catch((err) => console.error("Erro ao conectar ao banco:", err));

app.listen(3000, () => console.log("API rodando em http://localhost:3000"));
