const express = require('express');
const getData = require('../../../controllers/getController');
const router = express.Router();
const auth = require('../../../middlewares/jwtMiddleware');
const removeData = require('../../../controllers/removeController');
const editData = require('../../../controllers/editController');

router.get('/order/items',
    auth.passport.authenticate('bearer', {session: false}), (req, res) => {
      /**
         * instead of using orderItems.id we are using the orderID,
         * cause every order items should have the same
         * orderID who already included the restaurantID
         */

      // Firstly, let's find the order data:
      const foundOrderItem = getData('orderItems', {id: req.query.id})[0];
      if (!foundOrderItem) {
        return res.status(404).send('Error: order Item not found');
      }
      // Secondly, let's find the order data:
      const foundOrder = getData('orders', {id: foundOrderItem.orderID})[0];
      if (!foundOrder) {
        return res.status(404).send('Error: order not found');
      }
      // Thirdly, let's find the user data:
      const foundUser = getData('users', {id: foundOrder.userID})[0];
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
          return res.status(404).send('Data not found');
        } else {
          // if order item is empty after the deletion, delete the restaurantID:
          const foundOrderItemByOrderID = (
            getData('orderItems', {orderID: foundOrder.id})[0]
          );
          if (!foundOrderItemByOrderID) {
            foundOrder.restaurantID = null;
            const removedResult = editData('orders', foundOrder.id, foundOrder);
            if (removedResult) {
              return res.send(removedResult);
            } else {
              return res.status(500).send('oops, something is wrong here');
            }
          }
        }
      } else {
        return res.status(401).send('Not authorized');
      }
    });
module.exports = router;
