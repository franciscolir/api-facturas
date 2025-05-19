const User = require('../models/user.model');

const getAllUsers = async () => await User.findAll();

const getUserById = async (id) => await User.findByPk(id);

const createUser = async (data) => await User.create(data);

const updateUser = async (id, data) => {
  const user = await User.findByPk(id);
  return user ? await user.update(data) : null;
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  return user ? await user.destroy() : null;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

