const express = require('express');
const addData = require('../../../../controllers/addController');
const getData = require('../../../../controllers/getController');
const uid = require('uid');
const auth = require('../../../../middlewares/jwtMiddleware');
const app = express.Router();

app.post('/admin/orders/items',
    auth.verifyJwt('userLevel: 2'), (req, res) => {
      // Firstly, let's check if order ID and Menu ID is available:
      const foundOrder = getData(
          'orders',
          {id: req.body.orderID});
      const foundMenu = getData(
          'menus',
          {id: req.body.menuID});

      if (!foundOrder[0] && ! foundMenu[0]) {
        return res.status(404).send('Invalid order ID & menu ID');
      };
      if (!foundOrder[0]) {
        return res.status(404).send('Invalid order ID');
      };
      if (!foundMenu[0]) {
        return res.status(404).send('Invalid menu ID');
      };
      // If ok, continue:
      req.body.id = uid();
      const result = addData('orderItems', req.body);

      if (!result) {
        res.status(400).send('Wrong body');
      } else {
        res.send(result);
      }
      return;
    });

module.exports = app;
