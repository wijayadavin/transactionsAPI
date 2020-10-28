const express = require('express');
const getData = require('../../../../controllers/getController');
const auth = require('../../../../middlewares/jwtMiddleware');
const router = express.Router();

router.get('/admin/orders/items',
    auth.passport.authenticate('bearer', {session: false}), (req, res) => {
      const result = getData('orderItems', req.query);

      if (result) {
        res.send(result);
      } else {
        es.status(404).send('not found');
      }
    });

module.exports = router;
