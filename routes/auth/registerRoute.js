const express = require('express');
const addData = require('../../controllers/addController');
const getData = require('../../controllers/getController');
const app = express.Router();
// uid is a id generator library
// Reference: https://www.npmjs.com/package/uid
const uid = require('uid');


app.post('/auth/register', (req, res) => {
  // check if username or password are available:
  if (req.body.username && req.body.password) {
  // check if username has exist:
    isUsernameExist = getData('users', {username: req.body.username})[0];
    if (isUsernameExist) {
      res.status(409).send('The same username has exist');
    }

    // if not exist, continue:
    req.body.id = uid();
    if (req.body.username == 'admin') {
      req.body.role = 'admin';
    } else {
      req.body.role = 'user';
    }
    const result = addData('users', req.body);
    if (result) {
      res.send(result);
    } else {
    // called if request body object key is lacking:
      res.status(400).send('Bad request');
    }
  } else {
    res.status(400).send('Please insert username and password');
  }
},
);


module.exports = app;
