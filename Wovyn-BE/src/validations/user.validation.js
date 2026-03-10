const joi = require('joi');

// User Signup Validation
exports.signupSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
});

// User Login Validation
exports.loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
});
