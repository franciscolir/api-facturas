const userService = require('../services/user.service');

exports.getAll = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

exports.getOne = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  user ? res.json(user) : res.status(404).json({ message: 'Usuario no encontrado' });
};

exports.create = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
};

exports.update = async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  user ? res.json(user) : res.status(404).json({ message: 'Usuario no encontrado' });
};

exports.delete = async (req, res) => {
  const user = await userService.deleteUser(req.params.id);
  user ? res.json({ message: 'Usuario eliminado' }) : res.status(404).json({ message: 'Usuario no encontrado' });
};
