const express = require('express');
const getData = require('../../controllers/getController');
const auth = require('../../middlewares/jwtMiddleware');
const app = express.Router();


app.get('/orders',
    auth.verifyJwt('role: user'), (req, res) => {
      // read all order with userID == user's ID from the token
      const result = getData('orders', {userID: req.user.id});

      if (result) {
        // If not succeeded:
        res.send(result);
      } else {
        // If condition 1 & 2 are not ok, then send error:
        res.status(404).send('data not found');
      }
      return;
    });


module.exports = app;
