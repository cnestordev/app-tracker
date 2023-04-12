const mongoose = require("mongoose");
const Category = require("./models/Category");
const Application = require("./models/Application");
const User = require("./models/User");
const dotenv = require("dotenv");
dotenv.config();

// Connect to the database
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl);

// Create a new user
const dummyUser = new User({
  username: "alwaysred",
  created: new Date(),
});

// Create a new job category and associate it with the job application
const dummyCategory = new Category({
  name: "Front End Developer",
  isActive: true,
});

// Create a new job application and associate it with the user
const dummyApplication = new Application({
  role: "Front End Developer",
  company: "Tesla",
  location: {
    city: "San Diego",
    state: "CA",
  },
  date: new Date("2023-04-12"),
  source: "Indeed",
  status: "Applied",
  info: "Job description goes here",
  created: new Date(),
  isHidden: false,
  isArchived: false,
  user: dummyUser._id,
  category: dummyCategory._id,
});

const dummyApplication2 = new Application({
  role: "Junior Front End Developer",
  company: "Meta",
  location: {
    city: "San Franscisco",
    state: "CA",
  },
  date: new Date("2023-04-12"),
  source: "Indeed",
  status: "Applied",
  info: "Job description goes here",
  created: new Date(),
  isHidden: false,
  isArchived: false,
  user: dummyUser._id,
  category: dummyCategory._id,
});

// Associate the job application with the user
dummyUser.applications.push(dummyApplication._id);
dummyUser.applications.push(dummyApplication2._id);
dummyUser.categories.push(dummyCategory._id);
dummyCategory.applications.push(dummyApplication._id);
dummyCategory.applications.push(dummyApplication2._id);

// Save the models to the database
(async () => {
  try {
    await dummyUser.save();
    await dummyApplication.save();
    await dummyApplication2.save();
    await dummyCategory.save();
    console.log("Dummy data seeded successfully!");
  } catch (error) {
    console.log("Error seeding dummy data:", error);
  } finally {
    // Close the mongoose connection
    mongoose.connection.close();
  }
})();
