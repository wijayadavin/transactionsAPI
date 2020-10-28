const express = require('express');
const getData = require('../../../controllers/getController');
const router = express.Router();
const permissionHelper = require('../../../helpers/permissionHelper');


router.get('/restaurants', permissionHelper(['user', 'admin']), (req, res) => {
  const query = req.query;
  const result = getData('restaurants', query);
  if (!result) {
    res.status(404).send('Data not found');
  }
  res.send(result);
});

module.exports = router;
