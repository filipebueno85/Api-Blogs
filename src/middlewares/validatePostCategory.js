// // const CategoryService = require('../services/category.service');
// const Joi = require('joi');

// const message = 'Some required fields are missing';

// const schemaUser = Joi.object({
//   title: Joi.string().required()
// .messages({
//     // 'string.min': '"name" length must be at least 4 characters long',
//     'string.required': message,
//   }),
//   content: Joi.string().required()
// .messages({
//     // 'string.min': '"name" length must be at least 8 characters long',
//     'string.required': message,
//   }),
//   categoryIds: Joi.number().required()
// .messages({
//     'number.required': message,
//   }),
// });

const validatePostCategory = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  if (!content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  if (!categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  return next();
};

module.exports = validatePostCategory;
