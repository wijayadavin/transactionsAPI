const express = require('express');
const getData = require('../../controllers/getController');
const removeData = require('../../controllers/removeController');
const auth = require('../../middlewares/jwtMiddleware');
const app = express.Router();


app.delete('/orders',
    auth.verifyJwt('userLevel: 1'), (req, res) => {
      try {
        // Firstly, let's find order data by id from the requested query:
        const foundOrderData = getData('orders', req.query);

        /**
         * Condition 1: The order data is available in the Database
         * Condition 2: The userID in requested order data is the same with
         *              user's id from the token
         */
        if (foundOrderData && foundOrderData[0].userID == req.user.id) {
        // Condition 1 & 2 are ok? then let's remove the data:
          const result = removeData.removeDataByQuery(
              'orders',
              req.query,
          );

          if (result) {
          // If succeeded:
            res.send('The order was successfully deleted');
          } else {
          // If not succeeded:
            res.status(400).send('Bad request');
          }
        } else {
        // If condition 1 & 2 are not ok, then send error:
          res.status(404).send('Error: Not found');
        }
      } catch (err) {
        // if catched an error, send error:
        if (err.name == 'TypeError') {
          res.status(404).send('Error: not found');
        } else {
          res.status(500).send('Oops something is wrong here');
        }
      }
    });


module.exports = app;
