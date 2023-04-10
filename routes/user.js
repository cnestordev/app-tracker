const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/authMiddleware");
const axios = require("axios");
const User = require("../models/User");

router.put("/:id/toggledarkmode", checkAuth, async (req, res) => {
  const { type } = req.body;
  console.log(req.params.id);
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { "theme.type": type } },
      { new: true }
    );
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating theme.",
    });
  }
});

module.exports = router;
