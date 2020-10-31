const express = require('express');
const getData = require('../../../controllers/getController');
const userPermission = require('../../../controllers/userController');

const router = express.Router();

router.get('/menus',
// userPermission(['user', 'admin']),
(req, res) => {
  const result = getData('menus');
  if (!result) {
    return res.status(404).send('Data not found');
  }
  return res.render('menus', {menus: result});
});

router.get('/restaurantID/:menuID',
// userPermission(['user', 'admin']),
(req, res) => {
  console.log(req.params.menuID);
  const result = getData('menus', {id: req.params.menuID})[0];
  if (!result) {
    return res.status(404).send('Data not found');
  }
  return res.render('menus', {menu: result});
});

module.exports = router;
