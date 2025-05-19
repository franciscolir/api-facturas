const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Rutas base CRUD
router.get('/', userController.getAll.bind(userController));
router.get('/:id', userController.getById.bind(userController));
router.post('/', userController.create.bind(userController));
router.put('/:id', userController.update.bind(userController));
router.delete('/:id', userController.delete.bind(userController));

// Rutas específicas
router.get('/email/:email', userController.getByEmail.bind(userController));
router.get('/rol/:rol', userController.getByRol.bind(userController));
router.get('/vendedores/activos', userController.getActiveVendedores.bind(userController));
router.put('/:id/toggle-activo', userController.toggleActivo.bind(userController));

module.exports = router;

