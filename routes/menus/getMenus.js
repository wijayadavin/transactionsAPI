const express = require("express");
const getData = require("../../controllers/getController");
const app = express.Router();

app.get('/menus', (req, res) => {
    const query = req.query
    const id = req.user.id
    query.usersId = id
    const result = getData('menus', query)
    res.send(result)
})

module.exports = app;