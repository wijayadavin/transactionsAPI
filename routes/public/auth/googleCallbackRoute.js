const express = require('express');
const router = express.Router();
const passport = require('../../../middlewares/googleOauthMiddleware')


// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/failed' }),
  (req, res) => {
      // Successful authentication, redirect to /login-success
    res.redirect('/login-success');
  });


module.exports = router;
