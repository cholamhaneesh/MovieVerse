const express = require("express");

const movieRoutes = require("./routes/movieRoutes");

const mongoose = require("mongoose");

const methodOverride = require("method-override");

const authRoutes = require("./routes/authRoutes");

const session = require("express-session");

const passport = require("passport");

const LocalStrategy = require("passport-local");

const User = require("./models/User");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.set("view engine", "ejs");

mongoose
    .connect("mongodb://127.0.0.1:27017/movieverse")
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log(err);
    });

const sessionConfig = {
    secret: "mysecret",

    resave: false,

    saveUninitialized: true
};

app.use(session(sessionConfig));

app.use(passport.initialize());

app.use(passport.session());

passport.use(
    new LocalStrategy(User.authenticate())
);

passport.serializeUser(
    User.serializeUser()
);

passport.deserializeUser(
    User.deserializeUser()
);

app.use((req, res, next) => {
    console.log(req.user);

    next();
});

app.use("/movies", movieRoutes);

app.use("/", authRoutes);

const port = 3000;

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.send("Login Page");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});