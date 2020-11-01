const express = require('express');
const getData = require('../../../controllers/getController');
const userPermission = require('../../../controllers/userController');
const router = express.Router();


router.get('/restaurants',
// userPermission(['user', 'admin']),
(req, res) => {
  const foundRestaurants = getData('restaurants');
  if (!foundRestaurants) {
    res.status(404).send('Data not found');
  }
  res.render('restaurants', {restaurants: foundRestaurants});
});

router.get('/:restaurantID',
// userPermission(['user', 'admin']),
(req, res) => {
  const foundRestaurant = getData('restaurants', {id: req.params.restaurantID})[0];
  if (!foundRestaurant) {
    res.status(404).send('Data not found');
  }
  const foundRestaurantMenus = getData('menus', {restaurantID: req.params.restaurantID});
  res.render('restaurant-page', {
    restaurant: foundRestaurant,
    restaurantMenus: foundRestaurantMenus
  });
});


module.exports = router;
