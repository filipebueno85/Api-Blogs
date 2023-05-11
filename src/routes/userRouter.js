const express = require('express');
const UserController = require('../controllers/user.controller');
const validateBody = require('../middlewares/validateBody');
const validateJwt = require('../middlewares/validateJWT');

const userRouter = express.Router();

userRouter.get('/user', validateJwt, UserController.getAllUsers);
userRouter.get('/user/:id', validateJwt, UserController.getUserById);
userRouter.post('/user', validateBody, UserController.createUser);
userRouter.delete('/user/me', validateJwt, UserController.excludeUser);

module.exports = userRouter;
