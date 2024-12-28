const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Only required if googleId is not present
      },
    },
    googleId: { type: String, unique: true },
    displayName: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    signupMethod: {
      type: String,
      enum: ["google", "facebook", "twitter", "email/password"], // Track how the user signed up
      required: true,
    },
    // accessToken: String, // Store the access token here
    // refreshToken: String, // Store the refresh token securely
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
