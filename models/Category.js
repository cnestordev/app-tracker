const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const CategorySchema = mongoose.Schema({
  value: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },
  ],
});

module.exports = mongoose.model("Category", CategorySchema);
