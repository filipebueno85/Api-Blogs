const express = require('express');
const UserController = require('../controllers/user.controller');
const validateBody = require('../middlewares/validateBody');

const userRouter = express.Router();

userRouter.post('/user', validateBody, UserController.createUser);

module.exports = userRouter;
