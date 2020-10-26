const express = require("express");
const getData = require("../../../controllers/getController");
const remove = require("../../../controllers/removeController");
const auth = require("../../../middlewares/jwtMiddleware");
const app = express.Router();

app.delete("/order/Items",
    auth.verifyJwt("userLevel: 1"), (req, res) => {
        // verify user who made an order
        const orderFound = getData('orders', { id: req.body.orderID })
        const isUserAllowed = orderFound[0].userId == req.user.id
        if (isUserAllowed) {
            const body = req.body
            const id = req.query.id
            const query = req.query

            if (id) {
                remove.removeDataById("orderItems", id)
                // remove the restaurantID from orders (on progress)
                res.send("Your Order Items Has Been Deleted")
            } else {
                res.status(400).send("Bad Request")
                return
            }

            if (query) {
                remove.removeDataByQuery("orderItems", query)
                // remove the restaurantID from orders (on progress)
                res.send("Your Order Items Has Been Deleted")
            } else {
                res.status(400).send("Bad Request")
                return
            }
        } else {
            res.status(400).send('Bad Request')
        }
    })

module.exports = app;
