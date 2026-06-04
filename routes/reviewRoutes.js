const express = require("express");

const router = express.Router({ mergeParams: true });

const reviewController = require("../controllers/reviewController");

const isLoggedIn = require("../middleware/isLoggedIn");

const isReviewAuthor = require(
    "../middleware/isReviewAuthor"
);

const wrapAsync =
    require("../utils/wrapAsync");

const canDeleteReview = require("../middleware/canDeleteReview");

router.post(
    "/",
    isLoggedIn,
    wrapAsync(reviewController.createReview)
);

router.put(
    "/:reviewId",
    isLoggedIn,
    wrapAsync(isReviewAuthor),
    wrapAsync(reviewController.updateReview)
);

router.delete(
    "/:reviewId",
    isLoggedIn,
    wrapAsync(canDeleteReview),
    wrapAsync(reviewController.deleteReview)
);

module.exports = router;