const express = require('express');
const getData = require('../../../controllers/getController');
const userPermission = require('../../../controllers/userController');
const router = express.Router();


router.get('/:restaurantID', userPermission(['user', 'admin']), (req, res) => {
  const query = req.query;
  const foundRestaurant = getData('restaurants', {id: req.params.restairantID})[0];
  if (!foundRestaurant) {
    res.status(404).send('Restaurant data not found');
  }
  const foundMenus = getData('menus', {restaurantID: foundRestaurant.id})
  res.status(200).render('restaurant-page', {
    restaurant: foundRestaurant,
    restaurantMenus: foundMenus,
  });
});

module.exports = router;
