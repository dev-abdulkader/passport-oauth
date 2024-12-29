const passport = require("passport");
const authService = require("./services/auth.service");

const googleAuth = (req, res, next) => {
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
};

const googleAuthCallback = (req, res, next) => {
  passport.authenticate(
    "google",
    { failureRedirect: "/login" },
    async (err, user) => {
      if (err || !user) {
        return res.redirect("/login");
      }
      const userData = authService.formatUserResponse(user);
      res.json(userData);
    }
  )(req, res, next);
};

const facebookAuth = (req, res, next) => {
  passport.authenticate("facebook", { scope: ["email"] })(req, res, next);
};

const facebookAuthCallback = (req, res, next) => {
  passport.authenticate(
    "facebook",
    { failureRedirect: "/login" },
    async (err, user) => {
      if (err || !user) {
        return res.redirect("/login");
      }
      const userData = authService.formatUserResponse(user);
      res.json(userData);
    }
  )(req, res, next);
};

const twitterAuth = (req, res, next) => {
  passport.authenticate("twitter")(req, res, next);
};

const twitterAuthCallback = (req, res, next) => {
  passport.authenticate(
    "twitter",
    { failureRedirect: "/login" },
    async (err, user) => {
      if (err || !user) {
        return res.redirect("/login");
      }
      const userData = authService.formatUserResponse(user);
      res.json(userData);
    }
  )(req, res, next);
};

// Logout
const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.redirect("/");
  });
};

// Grouped Export
module.exports = {
  googleAuth,
  googleAuthCallback,
  facebookAuth,
  facebookAuthCallback,
  twitterAuth,
  twitterAuthCallback,
  logout,
};
