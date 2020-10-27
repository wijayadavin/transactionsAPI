const express = require('express');
const getData = require('../../controllers/getController');
const app = express.Router();

app.get('/u/:username', (req, res) => {
  const result = getData('users', {username: req.params.username});
  // get username by username as path, return result if found:
  if (result && result.length) {
    res.send(result);
  } else {
    // or error if not found:
    res.status(404).send('Data not found');
  }
});

module.exports = app;
