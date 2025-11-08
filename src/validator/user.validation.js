const joi = require('joi');

// Validation schema for user registration
const UserSchemaValidator = joi.object({
    name: joi.string().min(4).max(10).required().messages({
        'string.base': `"name" should be a type of 'text'`,
        'string.empty': `"name" cannot be an empty field`,
        }),
    email: joi.string().email().required().messages({
        'string.base': `"email" should be a type of 'text'`,
        'string.email': `"email" must be a valid email`,
        'string.empty': `"email" cannot be an empty field`,
        }),
    password: joi.string().min(6).required().messages({
        'string.base': `"password" should be a type of 'text'`,
        'string.empty': `"password" cannot be an empty field`,
        'string.min': `"password" should have a minimum length of 5`,
        'string.max': `"password" should have a maximum length of 10`,  
        'any.required': `"password" is a required field`
        }),
    phone: joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.base': `"phone" should be a type of 'text'`,
        'string.empty': `"phone" cannot be an empty field`,
        'string.pattern.base': `"phone" must be a valid 10 digit number`,
        'any.required': `"phone" is a required field`  
        }),
});
module.exports = {
    UserSchemaValidator,
};