const express = require("express");
const addData = require("../../controllers/addController");
const uid = require("uid");
const app = express.Router();

app.post("/orders", (req, res) => {
  const body = req.body;
  body.id = uid();
  const result = addData("orders", body);
  res.send(result);
});

module.exports = app;
