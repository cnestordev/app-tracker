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

  console.log(dummyUser);

  // Create a new job category and associate it with the job application
  const dummyCategory = new Category({
    name: "Back End Developer",
    isActive: true,
  });

  const frontEndDevCategory = new Category({
    name: "Front End Developer",
    isActive: true,
  });

  const uiDevCategory = new Category({
    name: "UI Developer",
    isActive: true,
  });

  const frontEndDevApp1 = new Application({
    role: {
      value: "Front End Developer",
    },
    company: {
      value: "Facebook",
    },
    location: {
      city: {
        value: "Menlo Park",
      },
      state: {
        value: "CA",
      },
    },
    date: {
      value: new Date("2023-04-15"),
    },
    source: {
      value: "LinkedIn",
    },
    status: {
      value: "Applied",
    },
    info: {
      value: "Job description goes here",
    },
    created: {
      value: new Date(),
    },
    isHidden: {
      value: false,
    },
    isArchived: {
      value: false,
    },
    user: {
      id: dummyUser._id,
    },
    category: {
      id: frontEndDevCategory._id,
    },
  });

  const frontEndDevApp2 = new Application({
    role: {
      value: "Front End Developer",
    },
    company: {
      value: "Google",
    },
    location: {
      city: {
        value: "Mountain View",
      },
      state: {
        value: "CA",
      },
    },
    date: {
      value: new Date("2023-04-16"),
    },
    source: {
      value: "Indeed",
    },
    status: {
      value: "Applied",
    },
    info: {
      value: "Job description goes here",
    },
    created: {
      value: new Date(),
    },
    isHidden: {
      value: false,
    },
    isArchived: {
      value: false,
    },
    user: {
      id: dummyUser._id,
    },
    category: {
      id: frontEndDevCategory._id,
    },
  });

  // Create a new job application and associate it with the user
  const dummyApplication = new Application({
    role: {
      value: "Junior Back End Developer",
    },
    company: {
      value: "Meta",
    },
    location: {
      city: {
        value: "San Fransisco",
      },
      state: {
        value: "CA",
      },
    },
    date: {
      value: new Date("2023-04-12"),
    },
    source: {
      value: "Indeed",
    },
    status: {
      value: "Applied",
    },
    info: {
      value: "Job description goes here too",
    },
    created: {
      value: new Date(),
    },
    isHidden: {
      value: false,
    },
    isArchived: {
      value: false,
    },
    user: {
      id: dummyUser._id,
    },
    category: {
      id: dummyCategory._id,
    },
  });

  const uiDevApp = new Application({
    role: {
      value: "UI Developer",
    },
    company: {
      value: "Apple",
    },
    location: {
      city: {
        value: "Cupertino",
      },
      state: {
        value: "CA",
      },
    },
    date: {
      value: new Date("2023-04-17"),
    },
    source: {
      value: "Glassdoor",
    },
    status: {
      value: "Applied",
    },
    info: {
      value: "Job description goes here",
    },
    created: {
      value: new Date(),
    },
    isHidden: {
      value: false,
    },
    isArchived: {
      value: false,
    },
    user: {
      id: dummyUser._id,
    },
    category: {
      id: uiDevCategory._id,
    },
  });

  // Associate the job application with the user
  dummyUser.applications.push(dummyApplication._id);
  dummyUser.applications.push(frontEndDevApp1._id);
  dummyUser.applications.push(frontEndDevApp2._id);
  dummyUser.applications.push(uiDevApp._id);

  dummyUser.categories.push(dummyCategory._id);
  dummyUser.categories.push(frontEndDevCategory._id);
  dummyUser.categories.push(uiDevCategory._id);

  dummyCategory.applications.push(dummyApplication._id);
  dummyCategory.applications.push(frontEndDevApp1._id);
  dummyCategory.applications.push(frontEndDevApp2._id);
  dummyCategory.applications.push(uiDevApp._id);

  // Save the models to the database
  (async () => {
    try {
      await dummyUser.save();
      await dummyApplication.save();
      await frontEndDevApp1.save();
      await frontEndDevApp2.save();
      await uiDevApp.save();
      await dummyCategory.save();
      await frontEndDevCategory.save();
      await uiDevCategory.save();
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
