const express = require('express');
const getData = require('../../../controllers/getController');
const auth = require('../../../middlewares/jwtMiddleware');
const router = express.Router();

router.get('/admin/orders',
    auth.passport.authenticate('bearer', {session: false}), (req, res) => {
      const result = getData('orders', req.query);

      if (result) {
        res.send(result);
      } else {
        res.status(404).send('data not found');
      }
      return;
    });

module.exports = router;
