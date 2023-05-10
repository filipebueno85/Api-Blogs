const { createToken } = require('../auth/auth');

const LoginService = require('../services/login.service');

const isBodyValid = (email, password) => email && password;

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!isBodyValid(email, password)) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }
    const userEmail = await LoginService.getByEmail(email);
    if (!userEmail || password !== userEmail.password) {
      return res.status(400)
        .json({ message: 'Invalid fields' });
    }
    const { password: _password, ...userWithoutPassword } = userEmail.dataValues;

    const token = createToken(userWithoutPassword);

    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500)
    .json({ message: 'Erro interno', error: err.message });
  }
};
