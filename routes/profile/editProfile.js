const express = require("express")
const editData = require("../../controllers/editController")
const app = express.Router()
const auth = require('../../middlewares/jwtMiddleware')

app.patch("/profile",
    auth.verifyJwt('userLevel: 1'), (req, res) => {
        const body = req.body
        const id = req.query.id
        const result = editData("users", id, body)
        res.send(result)
    })

module.exports = app