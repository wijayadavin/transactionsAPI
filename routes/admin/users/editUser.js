const express = require('express');
const editData = require('../../../controllers/editController');
const userPermission = require('../../../controllers/userController');
const router = express.Router();
const auth = require('../../../middlewares/jwtMiddleware');


router.patch('/admin/users'), userPermission(['admin']), (req, res) => {
  const result = editData(
      'users',
      req.query.id,
      req.body);

  if (!result) {
    res.status(400).send('Bad request');
  } else {
    res.send(result);
  }
  return;
};

module.exports = router;
