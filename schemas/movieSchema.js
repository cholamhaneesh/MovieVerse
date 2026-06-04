const Joi = require("joi");

module.exports = Joi.object({

    title: Joi.string()
        .trim()
        .min(2)
        .required(),

    genres: Joi.string()
        .trim()
        .required(),

    releaseYear: Joi.number()
        .integer()
        .min(1888)
        .max(new Date().getFullYear())
        .required(),

    description: Joi.string()
        .trim()
        .min(10)
        .required()

});