const express = require('express');
const removeData = require('../../../controllers/removeController');
const permissionHelper = require('../../../helpers/permissionHelper');
const router = express.Router();
const auth = require('../../../middlewares/jwtMiddleware');

router.delete('/admin/users', permissionHelper(['admin']), (req, res) => {
  const result = removeData.removeDataByQuery('users', req.query);
  if (result) {
    res.send('OK!');
  } else {
    res.status(404).send('Error: not found');
  }
});

module.exports = router;
