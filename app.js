const express = require("express");

const movieRoutes = require("./routes/movieRoutes");

const mongoose = require("mongoose");

const methodOverride = require("method-override");

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

app.use("/movies", movieRoutes);

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