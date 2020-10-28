/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const getData = require('../../../controllers/getController');
const auth = require('../../../middlewares/jwtMiddleware');


router.get('/admin/restaurants'), (req, res) => {
      const result = getData('restaurants', req.query);

      if (result && result.length) {
        res.send(result);
      } else {
        res.status(404).send('Error: Not found');
      }
      return;
    };


module.exports = router;
