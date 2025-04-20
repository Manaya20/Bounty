const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(8).max(255).required(),
  role: Joi.string().valid('client', 'tasker').max(255).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  password: Joi.string().max(255).required()
});

module.exports = {
  registerSchema,
  loginSchema
};