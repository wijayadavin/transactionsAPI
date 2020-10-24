const express = require("express")
const getData = require("../../controllers/getController")
const app = express.Router()

app.get("/profile", (req, res) => {

    const id = req.query.id

    const result = getData('users', id)

    if (!result) {
        res.status(404).send('Data not found')
        return

    } else if (result) {
        res.send(result)
    } else {
        res.send(getData('users'))
    }

    res.send(result)

})

module.exports = app
