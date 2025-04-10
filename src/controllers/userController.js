const User = require("../models/user");

async function createUser(req, res) {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: "Campos obrigatórios ausentes." });
  }

  try {
    const user = await User.create({ nome, email, senha });
    return res.status(201).json(user);
  } catch (err) {
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
