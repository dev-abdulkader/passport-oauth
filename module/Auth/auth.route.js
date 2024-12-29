// const express = require("express");
// const passport = require("passport");
// const router = express.Router();

// // Google OAuth route to authenticate
// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// // Google OAuth callback route
// router.get(
//   "/google/redirect",
//   passport.authenticate("google", {
//     successRedirect: "/projected",
//     failureRedirect: "/login",
//   }),
//   (req, res) => {
//     const user = req.user;
//     res.json({
//       accessToken: user.accessToken,
//       refreshToken: user.refreshToken,
//       user: {
//         id: user.id,
//         displayName: user.displayName,
//         email: user.email,
//         profileImage: user.profileImage,
//       },
//     });
//   }
// );

// // Logout route
// router.get("/logout", (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return res.status(500).send("Error logging out");
//     }
//     res.redirect("/");
//   });
// });

// module.exports = router;

const express = require("express");
const passport = require("passport");
const authController = require("./controllers/auth.controller");

const router = express.Router();

// Google OAuth routes
router.get("/google", authController.googleAuth);
router.get("/google/redirect", authController.googleAuthCallback);

// Facebook OAuth routes
router.get("/facebook", authController.facebookAuth);
router.get("/facebook/redirect", authController.facebookAuthCallback);

// Twitter OAuth routes
router.get("/twitter", authController.twitterAuth);
router.get("/twitter/redirect", authController.twitterAuthCallback);

module.exports = router;
