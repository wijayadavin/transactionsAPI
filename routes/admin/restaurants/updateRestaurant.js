/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const editData = require('../../../controllers/editController');
const userPermission = require('../../../controllers/userController');
const auth = require('../../../middlewares/jwtMiddleware');
const urlencodedParser = require('body-parser').urlencoded({ extended: false })


router.patch('/edit/restaurant',
urlencodedParser,
// userPermission(['admin']),
(req, res) => {
  const editedRestaurant = editData(
      'restaurants',
      req.params.restaurantID,
      req.body,
  );

  if (!editedRestaurant) {
    return res.status(400).send('Bad request');
  } else {
    return res.redirect(`/${editedRestaurant.id}`);
  }
});


module.exports = router;
