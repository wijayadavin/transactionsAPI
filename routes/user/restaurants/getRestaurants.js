const express = require('express');
const getData = require('../../../controllers/getController');
const userPermission = require('../../../controllers/userController');
const router = express.Router();


router.get('/restaurants', userPermission(['user', 'admin']), (req, res) => {
  const query = req.query;
  const result = getData('restaurants', query);
  if (!result) {
    res.status(404).send('Data not found');
  }
  res.send(result);
});

router.get('/:restaurantID', userPermission(['user', 'admin']), (req, res) => {
  const result = getData('restaurants', {id: restaurantID});
  if (!result) {
    res.status(404).send('Data not found');
  }
  res.render('restaurant-page');
});

module.exports = router;
