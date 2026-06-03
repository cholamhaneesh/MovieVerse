const express = require("express");

const movieController = require("../controllers/movieController");

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

router.get("/new", movieController.renderNewForm);

router.post("/", movieController.createMovie);

router.get("/:id/edit", movieController.renderEditForm);

router.put("/:id", movieController.updateMovie);

router.delete("/:id", movieController.deleteMovie);

router.get("/:id", movieController.show);

router.get("/", movieController.index);

module.exports = router;