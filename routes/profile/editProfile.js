const express = require("express")
const editData = require("../../controllers/editController")
const getData = require("../../controllers/getController")
const app = express.Router()
const auth = require('../../middlewares/jwtMiddleware')

app.patch("/profile",
    auth.verifyJwt('userLevel: 1'), (req, res) => {
        const body = req.body
        const { id, username } = body
        const isUsernameExist = getData('users', username)

        if (!isUsernameExist) {
            res.status(409).send('You insert an existed Username')
        } else {
            editData('users', id, body)
            body.id = id
            res.send(body)
            return
        }
    })

module.exports = app