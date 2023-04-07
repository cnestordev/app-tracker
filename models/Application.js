const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const ApplicationSchema = mongoose.Schema({
  role: String,
  company: String,
  location: {
    city: String,
    state: String,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  source: String,
  status: String,
  info: String,
  created: {
    type: Date,
    default: new Date(),
  },
  isHidden: {
    type: Boolean,
    default: false,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

ApplicationSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Application", ApplicationSchema);
