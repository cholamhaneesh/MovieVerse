const User = require("../models/User");

const Review = require("../models/Review");

const Movie = require("../models/Movie");
module.exports.users = async (req, res) => {

    const users = await User.find({
        role: "user"
    });

    res.render("admin/users", {
        users
    });

};

module.exports.deleteUser = async (req, res) => {

    const { userId } = req.params;

    const reviews = await Review.find({
        author: userId
    });

    for (let review of reviews) {

        await Movie.updateMany(
            {
                reviews: review._id
            },
            {
                $pull: {
                    reviews: review._id
                }
            }
        );

    }

    await Review.deleteMany({
        author: userId
    });

    await User.findByIdAndDelete(
        userId
    );

    res.redirect("/admin/users");

};
