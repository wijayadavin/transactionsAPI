const express = require("express")
const getData = require("../../controllers/getController")
const app = express.Router()

app.get("/profile", (req, res) => {
    const query = req.query
    const result = getData('users', query)
    if (!result) {
        res.status(404).send('Data not found')
        return
    } else {
        res.send(result)
    }
})

module.exports = app

