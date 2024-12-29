const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String },
  googleId: { type: String },
  twitterId: { type: String },
  facebookId: { type: String },
  signupMethod: {
    type: String,
    enum: ["google", "facebook", "twitter", "email/password"],
    required: true,
  },
  name: { type: String },
  avatar: { type: String },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
