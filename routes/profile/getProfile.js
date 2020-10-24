const express = require("express")
const getData = require("../../controllers/getController")
const app = express.Router()

app.get("/profile", (req, res) => {

    const id = req.query.id

    const result = getData('users', id)

    if (!result) {
        res.status(404).send('Data not found')
        return

    } else {
        res.send(getData('users'))
    }

    res.send(result)

})

module.exports = app
