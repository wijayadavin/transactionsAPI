const express = require("express")
const removeData = require("../../../controllers/removeController")
const app = express.Router()
const auth = require('../../../middlewares/jwtMiddleware')

app.delete("/admin/users",
    auth.verifyJwt('userLevel: 2'), (req, res) => {
        const id = req.query.id
        const query = req.query
        if (id) {
            removeData.removeDataById("users", id)
        }

        if (query) {
            removeData.removeDataByQuery("users", query)
        } else {
            res.status(400).send("Bad Request")
        }
        res.send("OK!")
    })

module.exports = app