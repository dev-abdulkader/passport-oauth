const express = require("express");
const passport = require("passport");
const router = express.Router();

// Google OAuth route to authenticate
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback route
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: "/projected",
    failureRedirect: "/login",
  }),
  (req, res) => {
    const user = req.user;
    res.json({
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
      user: {
        id: user.id,
        displayName: user.displayName,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  }
);

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.redirect("/");
  });
});

module.exports = router;
