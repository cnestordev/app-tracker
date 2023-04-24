const session = require("express-session");
const MongoStoreFactory = require("connect-mongo");
const mongoose = require("mongoose");

const MongoStore = MongoStoreFactory;

const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URL,
  secret: process.env.SECRET,
  touchAfter: 24 * 60 * 60,
});

module.exports = store;
