const express = require("express")
const addData = require("../../../controllers/addController")
const uid = require("uid")
const app = express.Router()
const auth = require('../../../middlewares/jwtMiddleware')

app.post("/order/items",
    auth.verifyJwt('userLevel: 1'), (req, res) => {
        const body = req.body
        body.id = uid()
        body.orderID = req.orders.id
        body.menuID = req.menus.id
        const result = addData("orderItems", body)

        if (result) {
            res.send(result)
        } else {
            res.status(400).send('Ops! Something Wrong')
        }
    })

module.exports = app