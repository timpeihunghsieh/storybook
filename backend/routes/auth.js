const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc  Auth with Google
// @route GET /auth/google
// This is intended to be the destination for "Log in with Google"
router.get(
    '/google',
    passport.authenticate(
        'google', { scope: ['profile'] }));

// @desc  Google auth callback
// @route GET /auth/google/callback
// Google will send the user back here after authenticating.
// This code redirects the user to /dashboard if the user is authenticated.
// Note that req.user is now available thanks to deserializeuser() from
// above.
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/dashboard');
    }
);

// @desc Logout user
// @route /auth/logout
// Note! This logout will clear cookie for localhost and clear session.
// However, it will not log out the user from Google. 
// If user clicks log in again, then user will still be able to log in.
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;