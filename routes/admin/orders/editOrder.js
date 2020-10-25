const express = require('express');
const editData = require('../../../controllers/editController');
const auth = require('../../../middlewares/jwtMiddleware');
const app = express.Router();

app.patch('/admin/orders',
    auth.verifyJwt('userLevel: 2'), (req, res) => {
      const result = editData(
          'orders',
          req.query.id,
          body,
      );

      if (!result) {
        res.status(400).send('Bad request');
      } else {
        res.send(result);
      }
      return;
    });

module.exports = app;
