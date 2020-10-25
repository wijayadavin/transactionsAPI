const express = require('express');
const getData = require('../../controllers/getController');
const auth = require('../../middlewares/jwtMiddleware');
const app = express.Router();

app.get('/orders',
    auth.verifyJwt('userLevel: 1'), (req, res) => {
      const result = getData('orders', {userID: req.user.id});
      if (result) {
        res.send(result);
      } else {
        res.status(404).send('data not found');
      }
      return;
    });

module.exports = app;
