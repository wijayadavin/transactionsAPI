const express = require('express');
const getData = require('../../controllers/getController');
const router = express.Router();

router.get('/menus', (req, res) => {
  const query = req.query;
  const result = getData('menus', query);
  if (!result) {
    res.status(404).send('Data not found');
  }
  res.send(result);
});

module.exports = router;
