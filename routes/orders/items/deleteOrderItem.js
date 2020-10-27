const express = require('express');
const getData = require('../../../controllers/getController');
const app = express.Router();
const auth = require('../../../middlewares/jwtMiddleware');
const removeData = require('../../../controllers/removeController')

app.get('/order/items',
    auth.verifyJwt('role: user'), (req, res) => {
      /**
         * instead of using orderItems.id we are using the orderID,
         * cause every order items should have the same
         * orderID who already included the restaurantID
         */

      // Firstly, let's find the order data:
      const foundOrder = getData('orders', {id: req.query.id});
      if (!foundOrder || !foundOrder.length) {
        return res.status(404).send('Error: order not found');
      }
      // secondly, let's find the user data:
      const foundUser = getData('users', {id: req.body.userID})[0];
      if (!foundUser) {
        return res.status(404).send('Error: userID not found');
      }
      // Finally,
      // verify if userID from menuID is matched with userID from token:
      const isUserAllowed = foundUser.userID == req.user.id;
      if (isUserAllowed) {
        // If all is ok, then continue:
        const result = removeData.removeDataById('orderItems', req.query.id);
        if (!result) {
          res.status(404).send('Data not found');
        } else {
          res.send(result);
        }
      } else {
        res.status(401).send('Not authorized');
      }
    });
module.exports = app;
