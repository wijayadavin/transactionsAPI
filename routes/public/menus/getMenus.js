const express = require('express');
const getData = require('../../../controllers/getController');
const userPermission = require('../../../controllers/userController');

const router = express.Router();

router.get('/menus',
// userPermission(['user', 'admin']),
(req, res) => {
  const foundMenus = getData('menus');
  if (!foundMenus) {
    return res.status(404).send('Data not found');
  }
  foundMenus.forEach( (menu) => {
    menu.restaurantName = getData('restaurants', {id: menu.restaurantID})[0].name
  })
  return res.render('menus', {menus: foundMenus});
});

router.get('/:restaurantID/:menuID',
// userPermission(['user', 'admin']),
(req, res) => {
  const foundMenu = getData('menus', {id: req.params.menuID})[0];
  if (!foundMenu) {
    return res.status(404).send('Data not found');
  }
  return res.render('menu-page', {menu: foundMenu});
});

module.exports = router;
