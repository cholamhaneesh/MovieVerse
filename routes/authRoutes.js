const express = require("express");

const passport = require("passport");

const isLoggedIn = require("../middleware/isLoggedIn");

const validateUser = require("../middleware/validateUser");

const validateLogin =
    require("../middleware/validateLogin");

const router = express.Router();

const authController = require("../controllers/authController");

router.get("/register", authController.renderRegisterForm);

router.post("/register", validateUser, authController.register);

router.get("/login", authController.renderLoginForm);

router.post(
    "/login",
    validateLogin,
    passport.authenticate("local", {
        failureRedirect: "/login"
    }),
    (req, res) => {
        res.redirect("/movies");
    }
);

router.get("/logout", authController.logout);

router.get(
    "/profile",
    isLoggedIn,
    authController.profile
);

module.exports = router;