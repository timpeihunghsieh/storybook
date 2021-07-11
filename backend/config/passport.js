const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = function(passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    // This will run after the user has been authenticated
    // by Google. We save the user to the DB.
    const newUser = {
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      image: profile.photos[0].value
    };

    try {
      let user = await User.findOne({ googleId: profile.id })

      if (user) {
        done(null, user);
      } else {
        user = await User.create(newUser);
        done(null, user);
      }
    } catch (err) {
      console.error(err);
    }
  }));

  passport.serializeUser((user, done) => {
    // This is run after user has been authenticated and before
    // returning the response to the user. 
    // The intent is to store a piece of identifier in user's cookie,
    // so that we can use it to re-create User object in the next
    // request.
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // This is run for every subsequent request. 
    // After this is run req.user will have user Object.
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}