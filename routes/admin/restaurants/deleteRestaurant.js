/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const db = require('../../../controllers/removeController');
const permissionHelper = require('../../../helpers/permissionHelper');
const auth = require('../../../middlewares/jwtMiddleware');


router.delete('/admin/restaurants', permissionHelper(['admin']), (req, res) => {
  const result = db.removeDataByQuery(
      'restaurants',
      req.body,
  );

  if (!result) {
    res.status(404).send('Error: Not found');
  } else {
    res.send(result);
  }
  return;
});


module.exports = router;
