const express = require('express');
const getData = require('../../../controllers/getController');
const userPermission = require('../../../controllers/userController');
const router = express.Router();

router.get('/admin/orders'), userPermission(['admin']), (req, res) => {
  const result = getData('orders', req.query);

  if (result) {
    res.send(result);
  } else {
    res.status(404).send('data not found');
  }
  return;
};

module.exports = router;
