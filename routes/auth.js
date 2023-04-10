const express = require("express");
const router = express.Router();
const User = require("../models/User");
require("dotenv").config();
const axios = require("axios");
const passport = require("passport");

const checkAuth = require("../middleware/authMiddleware");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username });
    const newUser = await User.register(user, password);
    req.login(newUser, (err) => {
      if (err) {
        return next(err);
      }
      const { hash, salt, ...newUserObj } = newUser.toObject();
      return res.status(201).json({ success: true, newUserObj });
    });
  } catch (err) {
    res.status(401).json({ message: err.message, success: false });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      const { hash, salt, ...signedInUser } = user.toObject();
      return res.status(200).json({
        success: true,
        signedInUser,
      });
    });
  })(req, res, next);
});

router.get("/getuser", checkAuth, async (req, res) => {
  try {
    const username = req.user.username;
    const user = await User.findOne({ username });
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving user data.",
    });
  }
});

router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err)
      return res.status(500).json({
        success: false,
        message: "something went wrong with logging you out",
      });
    res.status(200).json({ success: true, message: "successfully logged out" });
  });
});

module.exports = router;
