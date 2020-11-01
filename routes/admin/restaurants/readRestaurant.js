/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const getData = require('../../../controllers/getController');
const userPermission = require('../../../controllers/userController');


router.get('/admin/restaurants', userPermission(['admin']), (req, res) => {
  const result = getData('restaurants', req.query);

  if (result && result.length) {
    res.send(result);
  } else {
    res.status(404).send('Error: Not found');
  }
  return;
});


module.exports = router;
