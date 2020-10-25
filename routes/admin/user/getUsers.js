
const express = require('express');
const getData = require('../../../controllers/getController');
const app = express.Router();
const auth = require('../../../middlewares/jwtMiddleware');

app.get('/admin/users',
    auth.verifyJwt('userLevel: 2'), (req, res) => {
      const query = req.query;
      const result = getData('users', query);

      if (!result) {
        res.status(404).send('Data not found');
      } else {
        res.send(result);
      }
    });

module.exports = app;
