import * as Joi from 'joi';

export const orderValidatorSchema = Joi.object({
  address: Joi.object({
    zipcode: Joi.string().required().min(8).max(8).messages({
      'string.empty': 'CEP é um campo obrigatório.',
    }),
    street: Joi.string().required().messages({
      'string.empty': 'Logradouro é um campo obrigatório.',
    }),
    number: Joi.number().integer().required().messages({
      'number.integer': 'Número deve ser do tipo inteiro.',
      'number.empty': 'Número é um campo obrigatório.',
    }),
    bairro: Joi.string().required().messages({
      'string.empty': 'Bairro é um campo obrigatório.',
    }),
    complement: Joi.string().required().messages({
      'string.empty': 'Complemento é um campo obrigatório.',
    }),
  })
    .required()
    .messages({
      'object.empty': 'Endereço é um campo obrigatório.',
    }),
  items: Joi.array().required().messages({
    'array.empty': 'Senha é um campo obrigatório.',
  }),
});
