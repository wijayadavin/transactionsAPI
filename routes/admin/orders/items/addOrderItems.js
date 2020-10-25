const express = require('express');
const addData = require('../../../../controllers/addController');
const uid = require('uid');
const auth = require('../../../../middlewares/jwtMiddleware');
const app = express.Router();

app.post('/admin/orders/items',
    auth.verifyJwt('userLevel: 2'), (req, res) => {
      const body = req.body;
      body.id = uid();
      const result = addData('orderItems', body);

      if (!result) {
        res.status(400).send('Wrong body');
      } else {
        res.send(result);
      }
      return;
    });

module.exports = app;
