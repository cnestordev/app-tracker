const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Application = require("./Application");
const User = require("./User");

const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: {
    type: String,
    required: [true, "something went wrong!"],
  },
  theme: {
    type: {
      type: String,
      default: "light",
    },
    color: {
      type: String,
      default: "blue",
    },
  },
  created: String,
  applications: [
    {
      type: Schema.Types.ObjectId,
      ref: "Application",
    },
  ],
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
