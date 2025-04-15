const User = require("../models/user");
const JoiValidator = require("../validations/userValidator");
const Logger = require("../logger/logger");

async function createUser(req, res) {
  const { nome, email, senha } = req.body;
  const { error } = JoiValidator.createUserSchema.validate(req.body);

  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  try {
    const user = await User.create({ nome, email, senha });
    Logger.info(`Usuário criado: ${user.id}`);

    return res.status(201).json(user);
  } catch (err) {
    Logger.error(`Erro ao criar usuário: ${err.message}`);
    return res
      .status(500)
      .json({ erro: "Erro ao criar usuário", detalhes: err.message });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ erro: "Erro ao buscar usuários" });
  }
}

async function getUserById(req, res) {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res
      .status(500)
      .json({ erro: "Erro ao buscar usuário", detalhes: err.message });
  }
}

async function updateUser(req, res) {
  const userId = req.params.id;
  const dadosAtualizados = req.body;
  const { error } = JoiValidator.updateUserSchema.validate(req.body);

  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  try {
    const [dadosAlterados] = await User.update(dadosAtualizados, {
      where: { id: userId },
    });

    if (dadosAlterados === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    return res.status(200).json({ mensagem: "Usuário atualizado com sucesso" });
  } catch (err) {
    return res
      .status(500)
      .json({ erro: "Erro ao atualizar usuário", detalhes: err.message });
  }
}

async function deleteUser(req, res) {
  const userId = req.params.id;

  try {
    const deletado = await User.destroy({ where: { id: userId } });

    if (deletado) {
      return res.status(200).json({ mensagem: "Usuário excluído com sucesso" });
    } else {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao excluir usuário",
      detalhes: err.message,
    });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
