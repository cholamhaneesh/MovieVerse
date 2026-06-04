const Movie = require("../models/Movie");
const Review = require("../models/Review");
const User = require("../models/User");

module.exports.home = async (req, res) => {

    const moviesCount =
        await Movie.countDocuments();

    const reviewsCount =
        await Review.countDocuments();

    const usersCount =
        await User.countDocuments();

    const recentMovies =
        await Movie.find()
            .sort({ createdAt: -1 })
            .limit(3);

    res.render("home", {
        moviesCount,
        reviewsCount,
        usersCount,
        recentMovies
    });

};