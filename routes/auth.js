const express = require("express");
const router = express.Router();
const User = require("../models/User");
require("dotenv").config();
const axios = require("axios");
const passport = require("passport");
const { registerSchema } = require("../validations/authValidation");

const checkAuth = require("../middleware/authMiddleware");

// Register user and, if successful, login user
router.post("/register", async (req, res) => {
  const { username, password, theme } = req.body;

  // Validate the request body
  const { error } = registerSchema.validate({ username, password, theme });

  // return a 400 response with error message if validation fails
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const user = new User({ username, theme });
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

// login user
router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  // Validate request body
  const { error } = loginSchema.validate({ username, password });

  // return a 400 response with error message if validation fails
  if (error) {
    return res.status(400).json({ message: error.message });
  }

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

// check if user is logged in.  If so, return user object.  if not, middleware returns 401.
router.get("/getuser", checkAuth, async (req, res) => {
  try {
    const { username } = req.user;
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

// log out user
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err)
      return res.status(400).json({
        success: false,
        message: "something went wrong with logging you out",
      });
    res.status(200).json({ success: true, message: "successfully logged out" });
  });
});

module.exports = router;
