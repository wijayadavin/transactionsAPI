/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const addData = require('../../../controllers/addController');
const auth = require('../../../middlewares/jwtMiddleware');
const uid = require('uid');


router.post('/admin/restaurants',
    auth.verifyJwt('userLevel: 2'), (req, res) => {
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
