const { User } = require('../models');

const createUser = async ({ displayName, email, password, image }) => {
  const user = await User.create({ displayName, email, password, image });

  return user;
};

const getAllUsers = () => User.findAll();

const getByEmail = (email) => User.findOne({ where: { email } });

const getUserById = (id) => User.findByPk(id);

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getByEmail,
};
