const joi = require('joi');

// Create Category Validation
exports.createCategorySchema = joi.object({
    name: joi.string().min(2).max(100).required(),
    categoryType: joi.string()
        .valid('MEN', 'WOMEN', 'UNISEX', 'KIDS')
        .required()
});
