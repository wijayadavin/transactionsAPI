const express = require('express');
const router = express.Router();


// const isLoggedIn = (req, res, next) => {
//     if(req.user) {
//       next();
//     } else {
//       return res.sendStatus(401).send('Please login to continue')
//     }
//   }
// route if login success:
router.get('/login-success', (req, res) => {
    profilePicture = req.session.passport.user.photos[0].value;
    return res.render('login-success', {
      "user": req.session.passport.user,
      "profilePicture": profilePicture })
  })


module.exports = router;
