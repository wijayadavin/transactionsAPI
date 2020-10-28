const express = require('express');
const removeData = require('../../../controllers/removeController');
const auth = require('../../../middlewares/jwtMiddleware');
const router = express.Router();

router.delete('/admin/orders'), (req, res) => {
  const result = removeData.removeDataByQuery(
      'orders',
      req.query,
  );

  if (result) {
    res.send('order has been deleted');
  } else {
    res.status(400).send('not found');
  }
  return;
};

module.exports = router;
