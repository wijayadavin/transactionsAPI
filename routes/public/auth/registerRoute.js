const express = require('express');
const addData = require('../../../controllers/addController');
const getData = require('../../../controllers/getController');
const router = express.Router();
// uid is a id generator library
// Reference: https://www.npmjs.com/package/uid
const uid = require('uid');
const urlencodedParser = require('body-parser').urlencoded({ extended: false })


router.get('/auth/register', (req, res) => {
  const users = getData('users')
  res.status(200).render('register', { "users": users });
})

router.post('/auth/register', urlencodedParser, (req, res) => {
  console.log(req.body);
  // check if username or password are available:
  if (req.body.username && req.body.password) {
  // check if username has exist:
    isUsernameExist = getData('users', {username: req.body.username})[0];
    if (isUsernameExist) {
      return res.status(409).send('The same username has exist');
    }

    // if not exist, continue:
    req.body.id = `/u/${uid()}`;
    if (req.body.username == 'admin') {
      req.body.role = 'admin';
    } else {
      req.body.role = 'user';
    }
    const result = addData('users', req.body);
    if (result) {
      return res.render('register-success', {user: result});
    } else {
    // called if request body object key is lacking:
      return res.status(400).send('Bad request');
    }
  } else {
    return res.status(400).send('Please insert username and password');
  }
},
);


module.exports = router;
