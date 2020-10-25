
const express = require("express")
const addData = require("../../../controllers/addController")
const uid = require("uid")
const app = express.Router()
const auth = require('../../../middlewares/jwtMiddleware')

app.post("/admin/users",
    auth.verifyJwt('userLevel: 2'), (req, res) => {
        const body = req.body
        body.id = uid()
        const result = addData("users", body)

        if (result) {
            res.send(result)
        } else {
            res.status(400).send('Bad Request')
        }
    })

module.exports = app