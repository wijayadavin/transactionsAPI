const express = require('express');
const editData = require('../../../controllers/editController');
const app = express.Router();
const auth = require('../../../middlewares/jwtMiddleware');

app.patch('/admin/users',
    auth.verifyJwt('userLevel: 2'), (req, res) => {
      const result = editData(
          'users',
          req.query.id,
          req.body);

      if (!result) {
        res.status(400).send('Bad request');
      } else {
        res.send(result);
      }
      return;
    });

module.exports = app;
