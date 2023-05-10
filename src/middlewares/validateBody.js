const Joi = require('joi');

const schemaUser = Joi.object({
  displayName: Joi.string().min(8).required()
.messages({
    'string.min': '"displayName" length must be at least 8 characters long',
    'string.required': '"displayName" is required',
  }),
  email: Joi.string().email().required()
.messages({
    'string.min': '"email" must be a valid email',
    'string.required': '"email" is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be at least 6 characters long',
    'string.required': '"password" is required',
  }),
  image: Joi.string(),
});

const validateBody = (req, res, next) => {
  const { error } = schemaUser.validate(req.body);

    if (error) return res.status(400).json({ message: error.message });
    
  return next();
};

  module.exports = validateBody;