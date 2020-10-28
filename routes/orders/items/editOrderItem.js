const express = require('express');
const editData = require('../../../controllers/editController');
const getData = require('../../../controllers/getController');
const router = express.Router();
const auth = require('../../../middlewares/jwtMiddleware');

router.get('/order/items',
    auth.passport.authenticate('bearer', {session: false}), (req, res) => {
      /**
         * instead of using orderItems.id we are using the orderID,
         * cause every order items should have the same
         * orderID who already included the restaurantID
         */

      // Firstly, let's find the order data:
      const foundOrder = getData('orders', req.body.id)[0];
      if (!foundOrder) {
        return res.status(404).send('Error: order not found');
      }
      // Secondly, let's find the user data:
      const foundUser = getData('users', {id: foundOrder.userID})[0];
      if (!foundUser) {
        return res.status(404).send('Error: userID not found');
      }
      // Finally
      // verify if userID from menuID is matched with userID from token:
      const isUserAllowed = foundUser.id == req.user.id;
      if (isUserAllowed) {
        // If all is ok, then continue:
        const result = editData('orderItems', req.query);
        if (!result) {
          return res.status(404).send('Data not found');
        } else {
          return res.send(result);
        }
      } else {
        return res.status(401).send('Not authorized');
      }
    });
module.exports = router;
