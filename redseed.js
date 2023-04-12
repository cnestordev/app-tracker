const mongoose = require("mongoose");
const Category = require("./models/Category");
const Application = require("./models/Application");
const User = require("./models/User");
const dotenv = require("dotenv");
dotenv.config();

const seedDB = async () => {
  // Connect to the database
  const mongoUrl = process.env.MONGO_URL;
  mongoose.connect(mongoUrl);

  // Create a new user
  const dummyUser = await User.findOne({
    username: "red",
  });

  console.log(1);
  console.log(dummyUser);

  // Create a new job category and associate it with the job application
  const dummyCategory = new Category({
    name: "Back End Developer",
    isActive: true,
  });

  // Create a new job application and associate it with the user
  const dummyApplication = new Application({
    role: "Junior Back End Developer",
    company: "Meta",
    location: {
      city: "San Fransisco",
      state: "CA",
    },
    date: new Date("2023-04-12"),
    source: "Indeed",
    status: "Applied",
    info: "Job description goes here too",
    created: new Date(),
    isHidden: false,
    isArchived: false,
    user: dummyUser._id,
    category: dummyCategory._id,
  });

  // Associate the job application with the user
  dummyUser.applications.push(dummyApplication._id);
  dummyUser.categories.push(dummyCategory._id);
  dummyCategory.applications.push(dummyApplication._id);

  // Save the models to the database
  (async () => {
    try {
      await dummyUser.save();
      await dummyApplication.save();
      await dummyCategory.save();
      console.log("Dummy data seeded successfully!");
    } catch (error) {
      console.log("Error seeding dummy data:", error);
    } finally {
      // Close the mongoose connection
      mongoose.connection.close();
    }
  })();
};

seedDB();
