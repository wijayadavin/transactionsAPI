const express = require('express');
const editData = require('../../controllers/editController');
const auth = require('../../middlewares/jwtMiddleware');
const app = express.Router();
const getData = require('../../controllers/getController');


app.patch('/orders',
    auth.verifyJwt('userLevel: 1'), (req, res) => {
      try {
        // Firstly, let's find order data by id from the requested query:
        foundOrderData = getData('orders', {id: req.query.id});

        // Secondly let's see if order's status == 1
        if (foundOrderData[0].status == 1) {
          res.send('This order was checked out already').status(304);
        }

        /**
         * Finally, let's check for conditions:
         * Condition 1: The order data is available in the Database
         * Condition 2: The userID in requested order data is the same with
         *              user's id from the token
         */
        if (foundOrderData && foundOrderData[0].userID == req.user.id) {
        // Condition 1 & 2 are ok? then let's edit the data:
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
          // If failed:
            res.sendStatus(400).send('Bad request');
          } else {
          // If succeeded:
            res.send(result);
          }
        } else {
        // If condition 1 & 2 are not ok, then send error:
          res.sendStatus(404).send('Error: Not found');
        }
      } catch (err) {
        // if catched an error, send error:
        if (err.name == 'TypeError') {
          res.status(404).send('Error: not found');
        } else {
          res.status(500).send('Oops something is wrong here');
        }
      }
      return;
    });


module.exports = app;
