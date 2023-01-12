const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const config = require('./config');
const User = require('../models/User.js');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: config.CALLBACK_URL,
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const user = new User({
        providerId: profile.id,
        provider: profile.provider,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        passwordHash: null,
      });
      try {
        const pastUser = await User.findOne({ providerId: profile.id });

        if (pastUser) {
          done(null, pastUser);
        } else {
          await user.save();
          done(null, user);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
