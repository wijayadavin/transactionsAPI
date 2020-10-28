
const express = require('express');
const getData = require('../../../controllers/getController');
const permissionHelper = require('../../../helpers/permissionHelper');
const router = express.Router();
const auth = require('../../../middlewares/jwtMiddleware');

router.get('/admin/users'), permissionHelper(['admin']), (req, res) => {
  const result = getData('users', req.query);

  if (!result) {
    res.status(404).send('Data not found');
  } else {
    res.send(result);
  }
};

module.exports = router;
