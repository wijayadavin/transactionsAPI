const express = require("express");
const getData = require("../../../controllers/getController");
const app = express.Router();

app.get("/admin/orders", (req, res) => {
  const result = getData("orders", req.query);
  res.send(result);
});

module.exports = app;
