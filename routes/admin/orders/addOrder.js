const express = require('express');
const addData = require('../../../controllers/addController');
const getData = require('../../../controllers/getController');
const uid = require('uid');
const auth = require('../../../middlewares/jwtMiddleware');
const app = express.Router();

app.post('/admin/orders',
    auth.verifyJwt('userLevel: 2'), (req, res) => {
      // Firstly, let's check if userID is available:
      const foundUser = getData(
          'users',
          {id: req.body.userID});
      if (!foundUser[0]) {
        return res.status(404).send('Invalid user ID');
      };

      // If ok, continue:
      req.body.id = uid();
      const result = addData('orders', req.body);

      if (!result) {
        res.status(400).send('Wrong body');
      } else {
        res.send(result);
      }
      return;
    });

module.exports = app;
