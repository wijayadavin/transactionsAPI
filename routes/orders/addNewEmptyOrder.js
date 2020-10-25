const express = require('express');
const addData = require('../../controllers/addController');
const uid = require('uid');
const auth = require('../../middlewares/jwtMiddleware');
const app = express.Router();
const getToday = require('../../helpers/getTodayHelper');

app.post('/orders',
    auth.verifyJwt('userLevel: 1'), (req, res) => {
      // generate an empty order:
      newOrder = {
        id: uid(),
        userID: req.user.id,
        date: getToday(),
        status: 0,
        nominal: '0',
      };
      // push it to the database:
      const result = addData('orders', newOrder);

      if (!result) {
        // If failed:
        res.status(500).send('Sorry, something is wrong');
      } else {
        // If success:
        res.send(result);
      }
    });

module.exports = app;
