
const express = require('express');
const getData = require('../../../controllers/getController');
const app = express.Router();
const auth = require('../../../middlewares/jwtMiddleware');

app.get('/admin/users',
    auth.verifyJwt('role: admin'), (req, res) => {
      const result = getData('users', req.query);

      if (!result) {
        res.status(404).send('Data not found');
      } else {
        res.send(result);
      }
    });

module.exports = app;
