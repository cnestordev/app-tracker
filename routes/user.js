const express = require("express");
const router = express.Router();
const { checkAuth, checkIdMatch } = require("../middleware/authMiddleware");
const axios = require("axios");
const User = require("../models/User");
const Category = require("../models/Category");
const Application = require("../models/Application");

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

router.post(
  "/:id/newapplication",
  checkAuth,
  checkIdMatch,
  async (req, res) => {
    const newApplication = new Application(req.body);
    await newApplication.save();
    const userId = req.params.id;
    try {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { applications: newApplication } },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Application successfully added.",
        data: user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "An error occurred while adding your application.",
      });
    }
  }
);

// router.get("/:id/userdata", checkAuth, checkIdMatch, async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const user = await User.findById(userId)
//       .populate({
//         path: "categories",
//         select: "name",
//       })
//       .populate("applications");
//     res.status(200).json({ success: true, user });
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
