const express = require('express');
const getData = require('../../../../controllers/getController');
const auth = require('../../../../middlewares/jwtMiddleware');
const app = express.Router();

app.get('/admin/orders/items',
    auth.verifyJwt('userLevel: 2'), (req, res) => {
      const result = getData('orderItems', req.query);
      if (result) {
        res.send(result);
      } else {
        res.status(404).send('not found');
      }
      return;
    });

module.exports = app;
