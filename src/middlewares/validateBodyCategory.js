const Joi = require('joi');

const schemaUser = Joi.object({
  name: Joi.string().min(4).required()
.messages({
    'string.min': '"name" length must be at least 4 characters long',
    'string.required': '"name" is required',
  }),
});

const validateBodyCategory = (req, res, next) => {
  const { error } = schemaUser.validate(req.body);

    if (error) return res.status(400).json({ message: error.message });
    
  return next();
};

  module.exports = validateBodyCategory;