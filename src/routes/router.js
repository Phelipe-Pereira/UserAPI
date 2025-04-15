const UserController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.get('/user', (req, res) => {
  UserController.getAllUsers(req, res);
});

router.get('/user/:id', (req, res) => {
  UserController.getUserById(req, res);
});

router.post('/user', (req, res) => {
  UserController.createUser(req, res);
});

router.put('/user/:id', (req, res) => {
  UserController.updateUser(req, res);
});

router.delete('/user/:id', (req, res) => {
  UserController.deleteUser(req, res);
});

module.exports = router;
