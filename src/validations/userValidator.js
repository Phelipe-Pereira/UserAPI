const Joi = require('joi');

const createUserSchema = Joi.object({
  nome: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required()
});

const updateUserSchema = Joi.object({
  nome: Joi.string().min(3),
  email: Joi.string().email(),
  senha: Joi.string().min(6)
}).min(1); // exige pelo menos um campo

module.exports = {
  createUserSchema,
  updateUserSchema
};
