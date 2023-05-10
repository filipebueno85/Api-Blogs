const UserService = require('../services/user.service');

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.createUser({ email, password });

    if (!user) throw Error;

    res
      .status(201)
      .json({ message: 'Usuário criado com sucesso!', user });
  } catch (err) {
    res.status(500).json({
      message: 'Erro ao cadastrar o usuário no banco de dados!',
      error: err.message,
    });
  }
};

module.exports = {
  createUser,
};