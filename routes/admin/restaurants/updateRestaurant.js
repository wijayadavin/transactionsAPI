/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const editData = require('../../../controllers/editController');
const permissionHelper = require('../../../controllers/userController');
const auth = require('../../../middlewares/jwtMiddleware');


router.patch('/admin/restaurants', permissionHelper(['admin']), (req, res) => {
  const result = editData(
      'restaurants',
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
