const express = require('express');
const getData = require('../../../controllers/getController');
const addData = require('../../../controllers/addController');
const editData = require('../../../controllers/editController');
const uid = require('uid');
const app = express.Router();
const auth = require('../../../middlewares/jwtMiddleware');


app.post('/orders/items',
    auth.verifyJwt('userLevel: 1'), (req, res) => {
      try {
        // Get the order data from the requested orderID:
        foundOrder = getData('orders', {id: req.body.orderID});
        // Get the menu data from the requested menuID:
        foundMenu = getData('menus', {id: req.body.menuID});
        // Get the restaurant from the requested menuID:
        foundRestaurant = getData('restaurants', {id: foundMenu.restaurantID});
        /**
         * Condition 1: order data must be available in the dataset
         * Condition 2: The user ID who made the order must be
         *              match with user's ID from the token
         * Condition 3: all menu must be from the same restaurant
         */
        const condition1 = foundOrder && foundOrder.length;
        const condition2 = foundOrder[0].userID == req.user.id;
        let condition3 = (
          foundMenu[0].restaurantID == foundOrder[0].RestaurantID
        );

        // If order data has no restaurant:
        if (!foundOrder.RestaurantID) {
        // add a new restaurant id into the order data:
          foundOrder.restaurantID = foundRestaurant.id;
          editData('orders', foundOrder.id, foundOrder);
          condition3 = true;
        }

        // Finally. let's check all conditions:
        if (condition1 && condition2 && condition3) {
          req.body.id = uid();
          const result = addData('orderItems', req.body);

          if (result) {
            res.send({
              order: foundOrder[0],
              orderItem: result,
              menu: foundMenu[0],
            });
          } else {
            res.status(400).send('Ops! Something Wrong');
          }
        }
      } catch (err) {
        if (err.name == 'TypeError') {
          res.status(400).send('Error: Bad request');
        }
        res.status(500).send(err.message);
      }
    });

module.exports = app;
