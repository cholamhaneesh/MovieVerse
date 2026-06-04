const User = require("../models/User");

module.exports.renderRegisterForm = (req, res) => {
    res.render("auth/register");
};

module.exports.register = async (req, res) => {

    const { username, email, password } = req.body;

    const user = new User({
        username,
        email
    });

    const registeredUser = await User.register(
        user,
        password
    );

    console.log(registeredUser);

    res.redirect("/movies");
};

module.exports.renderLoginForm = (req, res) => {
    res.render("auth/login");
};

module.exports.logout = (req, res, next) => {

    req.logout((err) => {

        if (err) {
            return next(err);
        }

        res.redirect("/movies");
    });

};

module.exports.profile = (req, res) => {

    res.render("auth/profile");

};