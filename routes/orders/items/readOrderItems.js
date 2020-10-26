const express = require("express")
const getData = require("../../../controllers/getController")
const app = express.Router()
const auth = require('../../../middlewares/jwtMiddleware')

app.get("/order/items",
    auth.verifyJwt('userLevel: 1'), (req, res) => {
        // instead of using orderItems.id we are using the orderID, cause every order items should have the same orderID who already included the restaurantID
        const id = getData('orders', { id: req.body.orderID })
        // verify the userID who made an order
        const isUserAllowed = id[0].userID == req.user.id
        if (isUserAllowed) {
            const query = req.query
            query.orderID = id
            const result = getData('orderItems', query)

            if (!result) {
                res.status(404).send('Data not found')

            } else {
                res.send(result)
            }
        } else {
            res.status(400).send('Bad Request')
        }
    })
module.exports = app