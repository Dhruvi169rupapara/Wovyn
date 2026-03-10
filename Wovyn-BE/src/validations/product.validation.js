const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().max(200).required(),
    description: Joi.string().allow('', null),
    price: Joi.number().required(),
    image: Joi.string().allow('', null),
    categoryId: Joi.number().integer().required(),
    categoryType: Joi.string().valid('MEN', 'WOMEN', 'UNISEX', 'KIDS').required()
});

module.exports = {
    productSchema
};
