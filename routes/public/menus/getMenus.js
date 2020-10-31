const express = require('express');
const getData = require('../../../controllers/getController');
const userPermission = require('../../../controllers/userController');

const router = express.Router();

router.get('/menus/:menuID', userPermission(['user', 'admin']), (req, res) => {
  const query = req.query;
  const result = getData('menus', {id: req.params.menuID})[0];
  if (!result) {
    res.status(404).send('Data not found');
  }
  res.send(result);
});

module.exports = router;
