const express = require('express');
const getData = require('../../../controllers/getController');
const addData = require('../../../controllers/addController');
const editData = require('../../../controllers/editController');
const uid = require('uid');
const app = express.Router();
const auth = require('../../../middlewares/jwtMiddleware');


app.post('/orders/items',
    auth.verifyJwt('role: user'), (req, res) => {
      // Get the order data from the requested orderID:
      foundOrder = getData('orders', {id: req.body.orderID})[0];
      if (!foundOrder) {
        return res.status(404).send('Error: order not found');
      }
      // Get the menu data from the requested menuID:
      foundMenu = getData('menus', {id: req.body.menuID})[0];
      if (!foundMenu) {
        return res.status(404).send('Error: menu not found');
      }
      // Get the restaurant from the requested menuID:
      foundRestaurant = getData('restaurants', {id: foundMenu.restaurantID})[0];
      console.log([{id: foundMenu.restaurantID}, foundRestaurant]);
      if (!foundRestaurant) {
        return res.status(404).send('Error: restaurant not found');
      }
      // Check if the user ID who made the order is matched
      // with user's ID from the token:
      if (foundOrder.userID != req.user.id) {
        return res.status(401).send('Error: Not authorized');
      }
      // If order data has no restaurant:
      if (!foundOrder.RestaurantID) {
        // add a new restaurant id into the order data:
        foundOrder.restaurantID = foundMenu.restaurantID;
        const editResult = editData('orders', foundOrder.id, foundOrder);
        if (!editResult) {
          return res.status(500).send('Oops, something is wrong here');
        }
      }
      // Check if added menu is from the same restaurant:
      if (foundMenu.restaurantID != foundOrder.restaurantID) {
        console.log([foundMenu.restaurantID, foundOrder.restaurantID]);
        return res.status(406).send(
            'Error: ordered items must be from one restaurant only');
      }


      // If all ok, then continue:
      req.body.id = uid();
      const result = addData('orderItems', req.body);

      if (result) {
        return res.send({
          order: foundOrder,
          orderItem: result,
          menu: foundMenu,
        });
      } else {
        return res.status(400).send('Ops! Something Wrong');
      }
    });

module.exports = app;
