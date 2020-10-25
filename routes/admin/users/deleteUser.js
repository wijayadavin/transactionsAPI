const express = require('express');
const removeData = require('../../../controllers/removeController');
const app = express.Router();
const auth = require('../../../middlewares/jwtMiddleware');

app.delete('/admin/users',
    auth.verifyJwt('userLevel: 2'), (req, res) => {
      if (id) {
        removeData.removeDataById('users', req.query.id);
      }
      if (query) {
        removeData.removeDataByQuery('users', quereq.queryry);
      } else {
        res.status(400).send('Bad Request');
      }
      res.send('OK!');
    });

module.exports = app;
