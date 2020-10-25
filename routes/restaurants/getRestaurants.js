const express = require('express');
const getData = require('../../controllers/getController');
const app = express.Router();

app.get('/restaurants', (req, res) => {
  const query = req.query;
  const result = getData('restaurants', query);
  if (!result) {
    res.status(404).send('Data not found');
  }
  res.send(result);
});

module.exports = app;
