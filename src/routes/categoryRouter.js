const express = require('express');
const CategoryController = require('../controllers/category.controller');

const validateBodyCategory = require('../middlewares/validateBodyCategory');
const validateJwt = require('../middlewares/validateJWT');

const categoryRouter = express.Router();

categoryRouter.post(
'/categories',
 validateBodyCategory,
validateJwt,
CategoryController.createCategory,
);

module.exports = categoryRouter;
