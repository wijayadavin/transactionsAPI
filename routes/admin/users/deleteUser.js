const express = require('express');
const removeData = require('../../../controllers/removeController');
const app = express.Router();
const auth = require('../../../middlewares/jwtMiddleware');

app.delete('/admin/users',
    auth.verifyJwt('userLevel: 2'), (req, res) => {
      const result = removeData.removeDataByQuery('users', req.query);
      if (result) {
        res.send('OK!');
      } else {
        res.status(404).send('Error: not found');
      }
    });

module.exports = app;
