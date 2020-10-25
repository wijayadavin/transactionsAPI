const express = require("express")
const editData = require("../../../controllers/editController")
const app = express.Router()
const auth = require('../../../middlewares/jwtMiddleware')

app.patch("/admin/users",
    auth.verifyJwt('userLevel: 2'), (req, res) => {
        const body = req.body
        const id = req.query.id
        const result = editData("users", id, body)
        res.send(result)
    })

module.exports = app