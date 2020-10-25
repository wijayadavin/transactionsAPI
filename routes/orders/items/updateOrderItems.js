const express = require("express")
const editData = require("../../../controllers/editController")
const app = express.Router()
const auth = require('../../../middlewares/jwtMiddleware')

app.post("/order/items",
    auth.verifyJwt('userLevel: 1'), (req, res) => {
        const body = req.body
        const id = req.query.id
        body.orderID = req.orders.id
        body.menuID = req.menus.id
        const result = editData("orderItems", id, body)
        if (result) {
            res.send(result)
        } else {
            res.status(400).send('Ops! Something Wrong')
        }
    })

module.exports = app