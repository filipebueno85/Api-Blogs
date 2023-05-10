const express = require('express');
const UserController = require('../controllers/user.controller');
const validateBody = require('../middlewares/validateBody');
const validateJwt = require('../middlewares/validateJWT');

const userRouter = express.Router();

userRouter.get('/user', validateJwt, UserController.getAllUsers);
userRouter.post('/user', validateBody, UserController.createUser);

module.exports = userRouter;
