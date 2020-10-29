const express = require('express');
const router = express.Router();


const isLoggedIn = (req, res, next) => {
    if(req.user) {
      next();
    }
    res.sendStatus(401).send('Please login to continue')
  }
// route if login success:
router.get('/success-login', isLoggedIn, (req, res) => {
    console.log('success!');
    res.send(`Welcome, ${req.user.email}`)
  })


module.exports = router;
