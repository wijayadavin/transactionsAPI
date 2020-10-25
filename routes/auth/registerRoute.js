const express = require('express');
const addData = require('../../controllers/addController');
const getData = require('../../controllers/getController');
const app = express.Router();
// uid is a id generator library
// Reference: https://www.npmjs.com/package/uid
const uid = require('uid');


app.post('/auth/register', (req, res) => {
  req.body.id = uid();
  req.body.level = 1;
  isUsernameExist = getData('users', {username: req.body.username});
  if (isUsernameExist && isUsernameExist.length) {
    res.status(409).send('The same username has exist');
  }
  const result = addData('users', req.body);

  if (result) {
    res.send(result);
  } else {
    // called if request body object key is lacking:
    res.status(400).send('Bad request');
  }
},
);


module.exports = app;
