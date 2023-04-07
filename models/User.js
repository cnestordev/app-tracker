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
    type: String,
    color: String,
  },
  id: String,
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
