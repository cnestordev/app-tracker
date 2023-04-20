const express = require("express");
const router = express.Router();
const { checkAuth, checkIdMatch } = require("../middleware/authMiddleware");
const axios = require("axios");
const User = require("../models/User");
const Category = require("../models/Category");
const Application = require("../models/Application");

router.put("/:id/toggleColorTheme", checkAuth, async (req, res) => {
  const { type } = req.body;
  console.log(req.params.id);
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { "theme.type": type } },
      { new: true }
    )
      .populate({
        path: "categories",
        select: "value applications",
        populate: {
          path: "applications",
          select: "-category",
        },
      })
      .populate({
        path: "applications",
        select: "-category",
      });
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
        message: "Application successfully created.",
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

router.delete(
  "/:id/application/:applicationId/deleteapplication",
  checkAuth,
  checkIdMatch,
  async (req, res) => {
    const applicationId = req.params.applicationId;
    const userId = req.params.id;
    try {
      const application = await Application.findOneAndUpdate(
        { _id: applicationId },
        { "isHidden.value": true },
        { new: true }
      );
      const categoryId = application.category.id;
      await Category.findOneAndUpdate(
        { _id: categoryId },
        {
          $pull: { applications: applicationId },
          $addToSet: { hiddenApplications: applicationId },
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Application successfully hidden.",
        applicationId,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "An error occurred while hiding your application.",
      });
    }
  }
);

router.delete(
  "/:id/application/purgeapplications",
  checkAuth,
  checkIdMatch,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .populate({
          path: "categories",
          populate: {
            path: "applications",
            model: "Application",
          },
        })
        .populate({
          path: "applications",
          select: "-category",
        });

      if (!user) return res.status(404).json({ msg: "User not found" });

      for (let i = 0; i < user.categories.length; i++) {
        const category = user.categories[i];
        const applicationsToHide = category.applications.filter(
          (application) => !application.isHidden.value
        );

        // Update isHidden value of applicationsToHide
        applicationsToHide.forEach(async (application) => {
          application.isHidden.value = true;
          await application.save();
        });

        category.applications = category.applications.filter(
          (application) => !application.isHidden.value
        );
        category.hiddenApplications =
          category.hiddenApplications.concat(applicationsToHide);

        await category.save();
      }

      const updatedUser = await User.findById(req.params.id)
        .populate({
          path: "categories",
          populate: {
            path: "applications",
            model: "Application",
          },
        })
        .populate({
          path: "applications",
          select: "-category",
        });

      return res.json({
        success: true,
        message: "Applications successfully deleted",
        data: updatedUser,
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        success: false,
        message: "There was a problem deleting your applications",
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
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the category.",
    });
  }
});

module.exports = router;
