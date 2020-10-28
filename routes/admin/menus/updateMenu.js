/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const editData = require('../../../controllers/editController');
const auth = require('../../../middlewares/jwtMiddleware');
userPermission = require('../../../controllers/userController');

router.patch('/admin/menus', userPermission(['admin']), (req, res) => {
  const result = editData('menus',
      req.body.id,
      req.body,
  );

  if (!result) {
    res.status(400).send('Bad request');
  } else {
    res.send(result);
  }
  return;
});


module.exports = router;
