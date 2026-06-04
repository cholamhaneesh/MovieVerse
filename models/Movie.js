const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    genres: [
        {
            type: String
        }
    ],

    releaseYear: {
        type: Number,
        required: true
    },

    poster: {
        type: String
    },

    description: {
        type: String,
        required: true
    },

    avgRating: {
        type: Number,
        default: 0
    },

    reviews: [
        {
            type : Schema.Types.ObjectId,
            ref: "Review"
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Movie", movieSchema);