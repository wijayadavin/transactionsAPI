
const express = require('express');
const getData = require('../../../controllers/getController');
const router = express.Router();
const auth = require('../../../middlewares/jwtMiddleware');

router.get('/admin/users',
    auth.passport.authenticate('bearer', {session: false}), (req, res) => {
      const result = getData('users', req.query);

      if (!result) {
        res.status(404).send('Data not found');
      } else {
        res.send(result);
      }
    });

module.exports = router;
