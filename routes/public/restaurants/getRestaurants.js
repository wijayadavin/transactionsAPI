const express = require('express');
const getData = require('../../../controllers/getController');
const userPermission = require('../../../controllers/userController');
const router = express.Router();

router.get('/restaurants',
// userPermission(['user', 'admin']),
(req, res) => {
  const restaurants = getData('restaurants');
  if (!restaurants) {
    return res.status(404).send('Data not found');
  }
  return res.render('restaurants', {restaurants: restaurants});
});

router.get('/:restaurantID',
// userPermission(['user', 'admin']),
(req, res) => {
  const restaurant = getData('restaurants', {id: req.params.restaurantID})[0];
  if (!restaurant) {
    return res.status(404).send('Restaurant data was not found');
  }
  const restaurantMenus = getData('menus', {restaurantID: restaurant.id})  
  return res.render('restaurant-page', {
    restaurant: restaurant,
    restaurantMenus: restaurantMenus
  });
});

module.exports = router;
