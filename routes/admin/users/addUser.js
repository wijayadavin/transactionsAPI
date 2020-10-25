
const express = require('express');
const addData = require('../../../controllers/addController');
const getData = require('../../../controllers/getController');
const uid = require('uid');
const app = express.Router();
const auth = require('../../../middlewares/jwtMiddleware');


app.post('/admin/users',
    auth.verifyJwt('userLevel: 2'), (req, res) => {
      isUsernameExist = getData('users', {username: req.body.username});

      if (isUsernameExist && isUsernameExist.length) {
        res.status(409).send('The same username has exist');
      }
      req.body.id = uid();
      const result = addData('users', req.body);

      if (result) {
        res.send(result);
      } else {
        res.status(400).send('Bad Request');
      }
    });

module.exports = app;
