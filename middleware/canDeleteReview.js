const Review = require("../models/Review");

module.exports = async (req, res, next) => {

    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {
        return res.redirect("/movies");
    }

    const isAuthor =
        review.author.toString() ===
        req.user._id.toString();

    if (
        isAuthor ||
        req.user.role === "admin"
    ) {
        return next();
    }

    return res.redirect("/movies");

};