/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const db = require('../../../controllers/removeController');
const auth = require('../../../middlewares/jwtMiddleware');


router.delete('/admin/menus',
    auth.verifyJwt('userLevel: 2'), (req, res) => {
      const result = db.removeDataByQuery(
          'menus',
          req.query,
      );

      if (result) {
        res.send(`The menu was successfully deleted`);
      } else {
        res.status(404).send('Error: Not found');
      }
      return;
    });


module.exports = router;
