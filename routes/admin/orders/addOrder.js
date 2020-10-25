const express = require('express');
const addData = require('../../../controllers/addController');
const uid = require('uid');
const auth = require('../../../middlewares/jwtMiddleware');
const app = express.Router();

app.post('/admin/orders',
    auth.verifyJwt('userLevel: 2'), (req, res) => {
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
