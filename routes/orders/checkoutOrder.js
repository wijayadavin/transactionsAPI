const express = require('express');
const editData = require('../../controllers/editController');
const auth = require('../../middlewares/jwtMiddleware');
const app = express.Router();
const getData = require('../../controllers/getController');


app.patch('/orders',
    auth.verifyJwt('userLevel: 1'), (req, res) => {
      // Find order data by id from the requested query:
      foundOrderData = getData('orders', {id: req.query.id});

      /**
       * Condition 1: The order data is available in the Database
       * Condition 2: The userID in requested order data is the same with
       *              user's id from the token
       */
      if (foundOrderData && foundOrderData[0].userID == req.user.id) {
        const result = editData(
            'orders',
            req.query.id,
            {
              id: req.query.id,
              userID: req.user.id,
              status: 1,
              nominal: foundOrderData.nominal,
              date: foundOrderData.date,
            },
        );

        if (!result) {
          // if failed:
          res.sendStatus(400).send('Bad request');
        } else {
          // if succeeded:
          res.send(result);
        }
      } else {
        // if Condition 1 && condition 2 == false:
        res.sendStatus(404).send('Error: Not found');
      }

      return;
    });

module.exports = app;
