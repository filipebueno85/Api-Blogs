const express = require('express');
const LoginController = require('../controllers/login.controller');

const loginRouter = express.Router();

loginRouter.post('/login', LoginController);

module.exports = loginRouter;
