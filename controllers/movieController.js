const Movie = require("../models/Movie");

module.exports.index = async (req, res) => {
    const movies = await Movie.find({});

    res.render("movies/index", { movies });
};

module.exports.show = async (req, res) => {
    const { id } = req.params;

    const movie = await Movie.findById(id)
    .populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    });

    let userReview = null;

    if (req.user) {

        userReview = movie.reviews.find(
            review =>
                review.author._id.toString() ===
                req.user._id.toString()
        );

    }

    res.render("movies/show", {
        movie,
        userReview,
        currentUser: req.user
    });
};

module.exports.renderNewForm = (req, res) => {
    res.render("movies/new");
};

module.exports.createMovie = async (req, res) => {

    const movie = new Movie({
        title: req.body.title,
        genres: req.body.genres
            .split(",")
            .map(genre => genre.trim()),

        releaseYear: req.body.releaseYear,

        description: req.body.description
    });

    await movie.save();

    res.redirect("/movies");
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;

    const movie = await Movie.findById(id);

    res.render("movies/edit", { movie });
};

module.exports.updateMovie = async (req, res) => {
    const { id } = req.params;

    const updatedMovie = {
        title: req.body.title,

        genres: req.body.genres
            .split(",")
            .map(genre => genre.trim()),

        releaseYear: req.body.releaseYear,

        description: req.body.description
    };

    await Movie.findByIdAndUpdate(id, updatedMovie);

    res.redirect(`/movies/${id}`);
};

module.exports.deleteMovie = async (req, res) => {
    const { id } = req.params;

    await Movie.findByIdAndDelete(id);

    res.redirect("/movies");
};