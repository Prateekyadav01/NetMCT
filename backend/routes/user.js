const express = require("express");
const {
  userLogin,
  userRegistration,
  userLogout,
  saveUserAddress,
  likeDislikeController,
  getUser,
} = require("../controllers/user.js");
const authMiddleware = require("../middlewares/auth.js");

const router = express.Router();

router.post("/signup", userRegistration);

router.post("/signin", userLogin);

router.post("/signout", userLogout);

router.get("/authenticate", authMiddleware, getUser);

router.post("/address", authMiddleware, saveUserAddress);

router.post("/:action/:movieId", authMiddleware, likeDislikeController);

module.exports = router;
