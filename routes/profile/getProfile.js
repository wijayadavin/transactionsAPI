const express = require("express")
const getData = require("../../controllers/getController")
const app = express.Router()

app.get("/profile", (req, res) => {

    const id = req.query.id
    const dataId = getData('users', id.body)

    if (!dataId) {
        res.status(404).send('Data not found')
        return

    } else if (dataId) {
        res.send(dataId)
    } else {
        res.send(getData('users'))
    }

    res.send(result)
})

module.exports = app