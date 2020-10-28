const express = require('express');
const getData = require('../../controllers/getController');
const auth = require('../../middlewares/jwtMiddleware');
const router = express.Router();


router.get('/orders',
    auth.verifyJwt('role: user'), (req, res) => {
      // read all order with userID == user's ID from the token
      const result = getData('orders', {userID: req.user.id});

      if (result) {
        // If succeeded:
        res.send(result);
      } else {
        // If not succeeded:
        res.status(404).send('data not found');
      }
      return;
    });


module.exports = router;
