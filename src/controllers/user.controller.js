const { createToken } = require('../auth/auth');
const UserService = require('../services/user.service');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const emailExist = await UserService.getByEmail(email);
    if (emailExist) return res.status(409).json({ message: 'User already registered' });
    const user = await UserService.createUser({ displayName, email, password, image });

    if (!user) throw Error;
    const { password: _password, ...userWithoutPassword } = user.dataValues;

    const token = createToken(userWithoutPassword);
    return res
      .status(201)
      .json({ token });
  } catch (err) {
    return res.status(500).json({
      message: 'Erro ao cadastrar o usuário no banco de dados!',
      error: err.message,
    });
  }
};

module.exports = {
  createUser,
};