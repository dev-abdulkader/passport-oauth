const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../module/User/user.model");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google profile:", profile);

        // Find or create the user
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0]?.value,
            profileImage: profile.photos[0]?.value,
            accessToken: accessToken,
            refreshToken: refreshToken, // Store refresh token securely in the database
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          await user.save();
        } else {
          // Update the user's access token and refresh token if necessary
          // user.accessToken = accessToken;
          // user.refreshToken = refreshToken;
          await user.save();
        }

        // Skip using session here, just call done with user info
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// Serialize and deserialize user (only store user ID)
passport.serializeUser((user, done) => {
  done(null, user.id); // We only store the user ID in the session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Fetch user from DB if needed
    done(null, user); // Don't use this if you're not storing user data in session
  } catch (error) {
    done(error, null);
  }
});
