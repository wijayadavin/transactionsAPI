const express = require('express');
const getData = require('../../../controllers/getController');
const addData = require('../../../controllers/addController');
const editData = require('../../../controllers/editController');
const app = express.Router()
const auth = require('../../../middlewares/jwtMiddleware')

app.patch("/order/items",
    auth.verifyJwt('userLevel: 1'), (req, res) => {
        try {
            foundOrder = getData('orders', { id: req.body.orderID });
            foundMenu = getData('menus', { id: req.body.menuID });
            foundRestaurant = getData('restaurants', { id: foundMenu.restaurantID });

            const condition1 = foundOrder && foundOrder.length;
            const condition2 = foundOrder[0].userID == req.user.id;
            let condition3 = (
                foundMenu[0].restaurantID == foundOrder[0].RestaurantID
            );

            if (!foundOrder.RestaurantID) {
                foundOrder.restaurantID = foundRestaurant.id;
                editData('orders', foundOrder.id, foundOrder);
                condition3 = true;
            }

            if (condition1 && condition2 && condition3) {
                const body = req.body
                const id = req.query.id
                const result = editData("orderItems", id, body)
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

module.exports = app