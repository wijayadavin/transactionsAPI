const express = require('express');
const getData = require('../../../controllers/getController');
const permissionHelper = require('../../../controllers/userController');
const router = express.Router();


router.get('/restaurants', permissionHelper(['user', 'admin']), (req, res) => {
  const query = req.query;
  const result = getData('restaurants', query);
  if (!result) {
    res.status(404).send('Data not found');
  }
  res.send(result);
});

module.exports = router;