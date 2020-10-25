/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const addData = require('../../../controllers/addController');
const auth = require('../../../middlewares/jwtMiddleware');
const uid = require('uid');


router.post('/admin/menus',
    auth.verifyJwt('userLevel: 2'), (req, res) => {
      req.body.id = uid();
      const result = addData('menus', req.body);

      if (!result) {
        res.status(400).send('Wrong body');
      } else {
        res.send(result);
      }
      return;
    });


module.exports = router;