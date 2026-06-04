const Joi = require("joi");

module.exports = Joi.object({

    username: Joi.string()
        .trim()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(6)
        .required()

});