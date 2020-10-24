const express = require("express");
const getData = require("../../controllers/getController");
const uid = require("uid");
const app = express.Router();

app.get("/profile", (req, res) => {
    const body = req.body
    body.id = uid()
    const result = getData("users", body)
    res.send(result)
})

module.exports = app;