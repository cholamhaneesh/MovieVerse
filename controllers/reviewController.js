const Movie = require("../models/Movie");
const Review = require("../models/Review");

module.exports.createReview = async (req, res) => {

    const { movieId } = req.params;

    const movie = await Movie.findById(movieId);
    
    const existingReview = await Review.findOne({
        author: req.user._id,
        _id: { $in: movie.reviews }
    });

    if (existingReview) {
        return res.redirect(`/movies/${movieId}`);
    }

    const review = new Review({
        rating: req.body.rating,
        text: req.body.text,
        author: req.user._id
    });

    await review.save();

    movie.reviews.push(review);

    await movie.save();

    res.redirect(`/movies/${movieId}`);
};

module.exports.updateReview = async (req, res) => {

    const { movieId, reviewId } = req.params;

    await Review.findByIdAndUpdate(
        reviewId,
        {
            rating: req.body.rating,
            text: req.body.text
        }
    );

    res.redirect(`/movies/${movieId}`);
};

module.exports.deleteReview = async (req, res) => {

    const { movieId, reviewId } = req.params;

    await Movie.findByIdAndUpdate(
        movieId,
        {
            $pull: {
                reviews: reviewId
            }
        }
    );

    await Review.findByIdAndDelete(
        reviewId
    );

    res.redirect(`/movies/${movieId}`);
};