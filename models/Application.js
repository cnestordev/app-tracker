const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const ApplicationSchema = mongoose.Schema({
  role: {
    value: {
      type: String,
    },
    isShown: {
      type: Boolean,
      default: true,
    },
  },
  company: {
    value: {
      type: String,
    },
    isShown: {
      type: Boolean,
      default: true,
    },
  },
  location: {
    city: {
      value: {
        type: String,
      },
    },
    state: {
      value: {
        type: String,
      },
    },
    isShown: {
      type: Boolean,
      default: true,
    },
  },
  date: {
    value: {
      type: Date,
      default: new Date(),
    },
    isShown: {
      type: Boolean,
      default: true,
    },
  },
  source: {
    value: {
      type: String,
    },
    isShown: {
      type: Boolean,
      default: true,
    },
  },
  status: {
    value: {
      type: String,
    },
    isShown: {
      type: Boolean,
      default: true,
    },
  },
  info: {
    value: {
      type: String,
    },
    isShown: {
      type: Boolean,
      default: true,
    },
  },
  created: {
    value: {
      type: Date,
      default: new Date(),
    },
    isShown: {
      type: Boolean,
      default: false,
    },
  },
  isHidden: {
    value: {
      type: Boolean,
      default: false,
    },
    isShown: {
      type: Boolean,
      default: false,
    },
  },
  isArchived: {
    value: {
      type: Boolean,
      default: false,
    },
    isShown: {
      type: Boolean,
      default: false,
    },
  },
  category: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    isShown: {
      type: Boolean,
      default: false,
    },
  },
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isShown: {
      type: Boolean,
      default: false,
    },
  },
});

module.exports = mongoose.model("Application", ApplicationSchema);
