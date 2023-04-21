const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const LocalStrategy = require("passport-local");
const axios = require("axios");
const MongoStore = require("connect-mongo");

const User = require("./models/User");
const store = require("./config/MongoStore");
const authRouter = require("./routes/auth");
// const apiRouter = require("./routes/api");
const userRoute = require("./routes/user");

// ------------------- middleware setup ------------------------------------------------------------------

app.use(express.static(path.join(__dirname, "./client/build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    store,
    name: "pfil",
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
      maxAge: 1000 * 60 * 60 * 24 * 3,
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(cookieParser(process.env.SECRET));
app.use(passport.initialize());
app.use(passport.session());

// ------------------- mongoose setup ------------------------------

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
});

// ------------------- passport setup ------------------------------

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ------------------- routes setup ---------------------------------

app.get("/api/welcome", (req, res) => {
  res.status(200).json("Hi world");
});

// app.use("/api", apiRouter);
app.use("/auth", authRouter);
app.use("/user", userRoute);

app.get("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ------------------------------ end of routes ---------------------

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
