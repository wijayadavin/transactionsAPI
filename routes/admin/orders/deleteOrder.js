const express = require('express');
const removeData = require('../../../controllers/removeController');
const auth = require('../../../middlewares/jwtMiddleware');
const app = express.Router();

app.delete('/admin/orders',
    auth.verifyJwt('userLevel: 2'), (req, res) => {
      const result = removeData.removeDataByQuery(
          'orders',
          req.query,
      );

      if (result) {
        res.send('order has been deleted');
      } else {
        res.status(400).send('not found');
      }
      return;
    });

module.exports = app;
