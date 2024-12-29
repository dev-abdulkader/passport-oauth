const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const User = require("../module/User/user.model");

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            user = new User({
              googleId: profile.id,
              displayName: profile.displayName,
              email: profile.emails[0]?.value,
              profileImage: profile.photos[0]?.value,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
            await user.save();
          }

          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
};

const { Strategy: FacebookStrategy } = require("passport-facebook");
const User = require("../module/User/user.model");

module.exports = (passport) => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ["id", "displayName", "emails", "photos"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ facebookId: profile.id });

          if (!user) {
            user = new User({
              facebookId: profile.id,
              displayName: profile.displayName,
              email: profile.emails[0]?.value,
              profileImage: profile.photos[0]?.value,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
            await user.save();
          }

          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
};

const { Strategy: TwitterStrategy } = require("passport-twitter");
const User = require("../module/User/user.model");

module.exports = (passport) => {
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK_URL,
        includeEmail: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ twitterId: profile.id });

          if (!user) {
            user = new User({
              twitterId: profile.id,
              displayName: profile.displayName,
              email: profile.emails[0]?.value,
              profileImage: profile.photos[0]?.value,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
            await user.save();
          }

          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
};
