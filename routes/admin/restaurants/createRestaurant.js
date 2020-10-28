const express = require('express');
const router = express.Router();
const addData = require('../../../controllers/addController');
const uid = require('uid');
const userPermission = require('../../../controllers/userController');


router.post('/admin/restaurants', userPermission(['admin']), (req, res) => {
  req.body.id = uid();
  const result = addData('restaurants', req.body);

  // Firstly let's check if the restaurant name has exist:


  // If ok, continue:
  if (!result) {
    res.status(400).send('Wrong body');
  } else {
    res.send(result);
  }
  return;
});


module.exports = router;
