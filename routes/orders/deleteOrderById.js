const express = require('express');
const getData = require('../../controllers/getController');
const removeData = require('../../controllers/removeController');
const auth = require('../../middlewares/jwtMiddleware');
const app = express.Router();


app.delete('/orders',
    auth.verifyJwt('userLevel: 1'), (req, res) => {
      // find order data by id from the requested query
      const foundOrderData = getData('orders', req.query);

      if (foundOrderData && foundOrderData[0].userID == req.user.id) {
        const result = removeData.removeDataByQuery(
            'orders',
            req.query,
        );

        if (result) {
          res.send('The order was successfully deleted');
        } else {
          res.status(400).send('not found');
        }
      } else {
        res.status(400).send('bad request');
      }
      return;
    });

module.exports = app;
