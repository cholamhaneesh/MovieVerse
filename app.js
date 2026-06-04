const express = require("express");

const movieRoutes = require("./routes/movieRoutes");

const mongoose = require("mongoose");

const methodOverride = require("method-override");

const authRoutes = require("./routes/authRoutes");

const homeController = require("./controllers/homeController");

const adminRoutes = require("./routes/adminRoutes");

const ExpressError = require("./utils/ExpressError");

const wrapAsync = require("./utils/wrapAsync");

const session = require("express-session");

const passport = require("passport");

const LocalStrategy = require("passport-local");

const User = require("./models/User");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.use(express.static("public"));

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

app.use((req, res, next) => {

    res.locals.currentUser = req.user;

    res.locals.isAdmin =
        req.user &&
        req.user.role === "admin";

    next();

});

app.use("/movies", movieRoutes);

app.use("/", authRoutes);

app.use(
    "/admin",
    adminRoutes
);

const port = 3000;

app.get(
    "/",
    wrapAsync(homeController.home)
);

app.use((req, res, next) => {

    next(
        new ExpressError(
            "Page Not Found",
            404
        )
    );

});

app.use((err, req, res, next) => {

    if (err.name === "CastError") {

        err.statusCode = 404;

        err.message = "Movie not found";

    }

    const {
        statusCode = 500,
        message = "Something went wrong"
    } = err;

    res
        .status(statusCode)
        .send(message);

});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
