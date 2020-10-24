const express = require("express");
const removeData = require("../../../controllers/removeController");
const app = express.Router();

app.delete("/admin/orders", (req, res) => {
  const id = req.query.id;
  const query = req.query;
  if (id) {
    removeData.removeDataById("orders", id);
  }

  if (query) {
    removeData.removeDataByQuery("orders", query);
  } else {
    res.status(400).send("bad request");
  }
  res.send("ok");
});

module.exports = app;
