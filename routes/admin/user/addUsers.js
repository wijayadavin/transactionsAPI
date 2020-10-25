
const express = require("express")
const addData = require("../../../controllers/addController")
const uid = require("uid")
const app = express.Router()

app.post("/admin/users", (req, res) => {
    const body = req.body
    body.id = uid()
    const result = addData("users", body)

    if (result) {
        res.send(result)
    } else {
        res.status(404).send('Data not found')
    }
})

module.exports = app