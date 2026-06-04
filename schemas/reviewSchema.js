const Joi = require("joi");

module.exports = Joi.object({
    rating: Joi.number()
        .integer()
        .min(1)
        .max(5)
        .required(),

    text: Joi.string()
        .trim()
        .min(5)
        .required()
});