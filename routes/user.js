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
  "/:id/application/newapplication",
  checkAuth,
  checkIdMatch,
  async (req, res) => {
    console.log(req.body);
    const categoryId = req.body.category.id;
    const newApplication = new Application(req.body);
    await newApplication.save();
    const userId = req.params.id;
    try {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { applications: newApplication } },
        { new: true }
      );
      await Category.findOneAndUpdate(
        { _id: categoryId },
        { $push: { applications: newApplication } },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Application successfully added.",
        data: newApplication,
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

router.put(
  "/:id/application/:applicationId/editapplication",
  checkAuth,
  checkIdMatch,
  async (req, res) => {
    const applicationId = req.params.applicationId;
    const updatedApplication = req.body;
    const userId = req.params.userId;
    try {
      const application = await Application.findOneAndUpdate(
        { _id: applicationId },
        updatedApplication,
        { new: true, lean: true }
      );
      await User.findOneAndUpdate(
        { _id: userId, "applications._id": applicationId },
        { $set: { "applications.$": updatedApplication } },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Application successfully updated.",
        data: application,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "An error occurred while updating your application.",
      });
    }
  }
);

router.put("/:id/application/newcategory", async (req, res) => {
  const userId = req.params.id;
  const { value } = req.body;
  try {
    const user = await User.findById(userId);
    const newCategory = new Category({
      value,
    });
    const savedCategory = await newCategory.save();
    await user.categories.push(savedCategory._id);
    await user.save();
    res.status(200).json({
      success: true,
      message: "category was saved successfully!",
      data: {
        _id: savedCategory._id,
        value: savedCategory.value,
        applications: savedCategory.applications,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
