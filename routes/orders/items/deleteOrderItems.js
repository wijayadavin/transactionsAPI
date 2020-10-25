const express = require("express");
const remove = require("../../../controllers/removeController");
const auth = require("../../../middlewares/jwtMiddleware");
const app = express.Router();

app.delete("/order/Items",
    auth.verifyJwt("userLevel: 1"), (req, res) => {
        const id = req.query.id
        const query = req.query

        if (id) {
            remove.removeDataById("orderItems", id)
            res.send("Your Order Items Has Been Deleted")
        } else {
            res.status(400).send("Bad Request")
            return
        }

        if (query) {
            remove.removeDataByQuery("orderItems", query)
            res.send("Your Order Items Has Been Deleted")
        } else {
            res.status(400).send("Bad Request")
            return
        }
    })

module.exports = app;
