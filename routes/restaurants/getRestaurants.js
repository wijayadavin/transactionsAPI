const express = require("express");
const getData = require("../../controllers/getController");
const app = express.Router();
const authorization = require('../../middlewares/jwtMiddleware')

app.use(authorization)

app.get('/restaurants', (req, res) => {
    const query = req.query
    const id = req.user.id
    query.usersId = id
    const result = getData('restaurants', query)
    res.send(result)
})

module.exports = app;