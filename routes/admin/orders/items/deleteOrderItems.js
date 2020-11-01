const express = require('express');
const userPermission = require('../../../../controllers/userController');
const removeData = require('../../../../controllers/removeController');
const router = express.Router();

router.delete('/admin/orders/items'),
userPermission(['admin']), (req, res) => {
  const result = removeData.removeDataByQuery('orderItems', req.query);

  if (result) {
    res.send('order has been deleted');
  } else {
    res.status(400).send('not found');
  }
  return;
};

module.exports = router;
