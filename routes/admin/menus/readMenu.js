/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const getData = require('../../../controllers/getController');
const auth = require('../../../middlewares/jwtMiddleware');
const userPermission = require('../../../controllers/userController');

router.get('/admin/menus', userPermission(['admin']), (req, res) => {
  const result = getData('menus', req.query);

  if (result && result.length) {
    res.send(result);
  } else {
    res.status(404).send('Error: Not found');
  }
  return;
});


module.exports = router;
