const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controllers.js");

// MODE TWO
router.route("/register").post(authController.REGISTER_USER);
router.route("/login").post(authController.LOGIN_USER);

// Export the router
module.exports = router;
