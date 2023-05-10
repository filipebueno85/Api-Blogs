const { User } = require('../models');

const createUser = async ({ displayName, email, password, image }) => {
  const user = await User.create({ displayName, email, password, image });

  return user;
};

const getAllUsers = () => User.findAll({
  attributes: { exclude: ['password'] },
});

const getByEmail = (email) => User.findOne({ where: { email } });

const getUserById = async (id) => User.findOne({
  where: { id },
  attributes: { exclude: ['password'] },
});

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getByEmail,
};
