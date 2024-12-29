const passport = require("passport");
const googleStrategy = require("./google.strategy");
const facebookStrategy = require("./facebook.strategy");
const twitterStrategy = require("./twitter.strategy");

// Initialize strategies
googleStrategy(passport);
facebookStrategy(passport);
twitterStrategy(passport);

module.exports = passport;
