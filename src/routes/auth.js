const express = require("express");
const router = express.Router();
const { signupUser, loginUser } = require("../controller/auth");
const { auth, userMiddleware, adminMiddleware } = require("../middleware/auth");

//login route
router.post("/login", loginUser);

//signup route
router.post("/signup", signupUser);

module.exports = router;
