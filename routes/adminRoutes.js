const express = require("express");

const wrapAsync =
    require("../utils/wrapAsync");
    
const router = express.Router();

const adminController =
    require("../controllers/adminController");

const isLoggedIn =
    require("../middleware/isLoggedIn");

const isAdmin =
    require("../middleware/isAdmin");

router.get(
    "/users",
    isLoggedIn,
    isAdmin,
    wrapAsync(adminController.users)
);

router.delete(
    "/users/:userId",
    isLoggedIn,
    isAdmin,
    wrapAsync(adminController.deleteUser)
);

module.exports = router;