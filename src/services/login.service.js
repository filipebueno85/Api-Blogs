const { User } = require('../models');

const userLogin = async () => {
  const user = await User.findAll();

  return user;
};

const getByEmail = (email) => User.findOne({ where: { email } });

module.exports = {
  userLogin,
  getByEmail,
};