const express = require('express')
const app = express.Router()
const getData = require("../../controllers/getController");


app.get('/profile', (req, res) => {
    const query = req.query
    const id = req.user.id
    query.userId = id
    const result = db.get('users', query)
    res.send(result)
})

module.exports = app