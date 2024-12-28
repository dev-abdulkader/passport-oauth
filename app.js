const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session"); // Add session middleware
const authRoutes = require("./module/Auth/auth.route");
const passportSetup = require("./config/passport-setup");
require("dotenv").config();

const app = express();

// Session middleware setup (Passport needs this)
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "your_secret_key", // Set a session secret
//     resave: false, // Don't resave session if it's not modified
//     saveUninitialized: false, // Don't save uninitialized session
//   })
// );

// // Passport middleware
// app.use(passport.initialize());
// app.use(passport.session()); // This is required for session management with Passport

// Mongoose connection
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Set view engine to EJS
app.set("view engine", "ejs");

// Use authentication routes
app.use("/auth", authRoutes);

// Home route
app.get("/", (req, res) => {
  res.render("home", { user: req.user }); // Send user info if authenticated
});

app.get("/auth/register", (req, res) => {
  res.render("register");
});

app.get("/auth/login", (req, res) => {
  res.render("login");
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
