const express = require("express");
const getData = require("../../../controllers/getController");
const app = express.Router();

app.get("/admin/orderitems", (req, res) => {
  const result = getData("orderItems", req.query);
  res.send(result);
});

module.exports = app;
