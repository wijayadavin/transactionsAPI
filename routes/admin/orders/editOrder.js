const express = require('express');
const editData = require('../../../controllers/editController');
const permissionHelper = require('../../../controllers/userController');
const auth = require('../../../middlewares/jwtMiddleware');
const router = express.Router();

router.patch('/admin/orders'), permissionHelper(['admin']), (req, res) => {
  const result = editData(
      'orders',
      req.query.id,
      req.body,
  );

  if (!result) {
    res.status(400).send('Bad request');
  } else {
    res.send(result);
  }
  return;
};

module.exports = router;
