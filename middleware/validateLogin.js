const loginSchema =
    require("../schemas/loginSchema");

const ExpressError =
    require("../utils/ExpressError");

module.exports = (req, res, next) => {

    const { error } =
        loginSchema.validate(req.body);

    if (error) {

        const msg =
            error.details
                .map(el => el.message)
                .join(",");

        throw new ExpressError(
            msg,
            400
        );

    }

    next();

};