const express = require('express');
const router = express.Router();
const addData = require('../../../controllers/addController');
const uid = require('uid');
const userPermission = require('../../../controllers/userController');
const urlencodedParser = require('body-parser').urlencoded({ extended: false })


router.post('/admin/restaurants',
urlencodedParser,
// userPermission(['admin']),
(req, res) => {
  // Firstly let's check if the restaurant name has exist:
  if(getData('restaurants', req.body.name).length > 0) {
    return res.status(405).send('Error: The same restaurant name has exist')
  }
  // If not exist, continue:
  req.body.id = `${uid()}`;
  const result = addData('restaurants', req.body);

  // If ok, continue:
  if (!result) {
    res.status(400).send('Wrong body');
  } else {
    res.redirect('../restaurants');
  }
  return;
});


module.exports = router;
