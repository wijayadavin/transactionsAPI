const express = require('express');
const getData = require('../../../controllers/getController');
const auth = require('../../../middlewares/jwtMiddleware');
const app = express.Router();

app.get('/admin/orders',
    auth.verifyJwt('userLevel: 2'), (req, res) => {
      const result = getData('orders', req.query);

      if (result) {
        res.send(result);
      } else {
        res.status(404).send('data not found');
      }
      return;
    });

module.exports = app;
