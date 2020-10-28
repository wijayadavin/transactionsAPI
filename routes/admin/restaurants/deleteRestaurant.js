/* eslint-disable new-cap */
const express = require('express');
const userPermission = require('../../../controllers/userController');
const router = express.Router();
const db = require('../../../controllers/removeController');
const auth = require('../../../middlewares/jwtMiddleware');


router.delete('/admin/restaurants', userPermission(['admin']), (req, res) => {
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
