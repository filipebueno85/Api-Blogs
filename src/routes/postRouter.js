const express = require('express');
const PostController = require('../controllers/post.controller');
const validatePostCategory = require('../middlewares/validatePostCategory');
const validateJwt = require('../middlewares/validateJWT');
const validateCategory = require('../middlewares/validateCategory');
const validatePutCategory = require('../middlewares/validatePutCategory');

const postRouter = express.Router();

postRouter.get('/post/search', validateJwt, PostController.searchPosts);
postRouter.get('/post', validateJwt, PostController.getAllposts);
postRouter.get('/post/:id', validateJwt, PostController.getPostId);

postRouter.post(
'/post',
validateJwt,
validateCategory,
validatePostCategory, 
PostController.createPost,
);

postRouter.put('/post/:id', validateJwt, validatePutCategory, PostController.updatePost);

postRouter.delete('/post/:id', validateJwt, PostController.excludePost);

module.exports = postRouter;