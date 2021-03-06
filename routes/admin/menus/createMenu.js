/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const addData = require('../../../controllers/addController');
const getData = require('../../../controllers/getController');
const auth = require('../../../middlewares/jwtMiddleware');
const uid = require('uid');
const userPermission = require('../../../controllers/userController');
const urlencodedParser = require('body-parser').urlencoded({ extended: false })


router.post('/admin/menus',
urlencodedParser,
// userPermission(['admin']),
(req, res) => {
  // Firstly, let's check if restaurantID is available:
  const foundRestaurant = getData(
      'restaurants',
      {id: req.body.restaurantID});
  if (!foundRestaurant[0]) {
    return res.status(404).send('Invalid restaurant ID');
  };

  // If ok, continue:
  req.body.id = `/menus/${uid()}`;
  const result = addData('menus', req.body);

  if (!result) {
    res.status(400).send('Wrong body');
  } else {
    res.redirect(`../${req.body.restaurantID}`);
  }
  return;
});


module.exports = router;
