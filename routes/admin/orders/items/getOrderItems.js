const express = require('express');
const getData = require('../../../../controllers/getController');
const auth = require('../../../../middlewares/jwtMiddleware');
const app = express.Router();

app.get('/admin/orders/items',
    auth.verifyJwt('role: admin'), (req, res) => {
      const result = getData('orderItems', req.query);

      if (result) {
        res.send(result);
      } else {
        es.status(404).send('not found');
      }
    });

module.exports = app;
