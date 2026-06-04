const express = require("express");

const router = express.Router({ mergeParams: true });

const reviewController = require("../controllers/reviewController");

const isLoggedIn = require("../middleware/isLoggedIn");

const isReviewAuthor = require(
    "../middleware/isReviewAuthor"
);

router.post(
    "/",
    isLoggedIn,
    reviewController.createReview
);

router.put(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    reviewController.updateReview
);

router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    reviewController.deleteReview
);

module.exports = router;