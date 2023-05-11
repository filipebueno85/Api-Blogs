const express = require('express');
const PostController = require('../controllers/post.controller');
const validatePostCategory = require('../middlewares/validatePostCategory');
const validateJwt = require('../middlewares/validateJWT');
const validateCategory = require('../middlewares/validateCategory');

const postRouter = express.Router();

postRouter.post(
'/post',
validateJwt,
validateCategory,
validatePostCategory, 
PostController.createPost,
);

module.exports = postRouter;