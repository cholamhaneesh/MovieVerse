const express = require("express");

const movieController = require("../controllers/movieController");

const isLoggedIn = require("../middleware/isLoggedIn");

const isAdmin = require("../middleware/isAdmin");

const reviewRoutes = require("./reviewRoutes");

const router = express.Router();

router.use("/:movieId/reviews", reviewRoutes);

// router.get("/test", async (req, res) => {
//     const Movie = require("../models/Movie");

//     const movie = new Movie({
//         title: "Interstellar",
//         genres: ["Sci-Fi", "Drama"],
//         releaseYear: 2014,
//         description: "A team travels through a wormhole in space.",
//         avgRating: 4.8
//     });

//     await movie.save();

//     res.send("Test movie created");
// });

router.get("/new", isLoggedIn, isAdmin, movieController.renderNewForm);

router.post("/", isLoggedIn, isAdmin, movieController.createMovie);

router.get("/:id/edit", isLoggedIn, isAdmin, movieController.renderEditForm);

router.put("/:id", isLoggedIn, isAdmin, movieController.updateMovie);

router.delete("/:id", isLoggedIn, isAdmin, movieController.deleteMovie);

router.get("/:id", movieController.show);

router.get("/", movieController.index);

module.exports = router;