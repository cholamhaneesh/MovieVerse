const Review = require("../models/Review");

module.exports = async (req, res, next) => {

    const { reviewId } = req.params;

    const review = await Review.findById(
        reviewId
    );

    if (
        review.author.toString() !==
        req.user._id.toString()
    ) {
        return res.redirect("/movies");
    }

    next();
};