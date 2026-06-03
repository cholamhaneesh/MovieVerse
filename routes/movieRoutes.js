const express = require("express");

const movieController = require("../controllers/movieController");

const isLoggedIn = require("../middleware/isLoggedIn");

const router = express.Router();

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

router.get("/new", isLoggedIn, movieController.renderNewForm);

router.post("/", isLoggedIn, movieController.createMovie);

router.get("/:id/edit", isLoggedIn, movieController.renderEditForm);

router.put("/:id", isLoggedIn, movieController.updateMovie);

router.delete("/:id", isLoggedIn, movieController.deleteMovie);

router.get("/:id", movieController.show);

router.get("/", movieController.index);

module.exports = router;