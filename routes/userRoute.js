const express = require("express");
const {
  getUserData,
  signUpUser,
  signInUser,
} = require("../controller/userController");
const router = express.Router();

router.route("/").get(getUserData).post(signUpUser);
router.route("/signin").post(signInUser);

module.exports = router;
