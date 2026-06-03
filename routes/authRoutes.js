const express = require("express");

const passport = require("passport");

const router = express.Router();

const authController = require("../controllers/authController");

router.get("/register", authController.renderRegisterForm);

router.post("/register", authController.register);

router.get("/login", authController.renderLoginForm);

router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/login"
    }),
    (req, res) => {
        res.redirect("/movies");
    }
);

router.get("/logout", authController.logout);

module.exports = router;