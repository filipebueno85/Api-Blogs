const { User } = require('../models');

const createUser = async ({ email, password }) => {
  const user = await User.create({ email, password });

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
