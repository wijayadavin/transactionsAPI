const express = require('express');
const addData = require('../../controllers/addController');
const uid = require('uid');
const auth = require('../../middlewares/jwtMiddleware');
const app = express.Router();

app.post('/orders',
    auth.verifyJwt('userLevel: 1'), (req, res) => {
      const body = req.body;
      body.id = uid();
      const result = addData('orders', body);

      if (!result) {
        res.status(400).send('Wrong body');
      } else {
        res.send(result);
      }
    });

module.exports = app;
