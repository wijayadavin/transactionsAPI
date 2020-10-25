const express = require('express');
const editData = require('../../../../controllers/editController');
const auth = require('../../../../middlewares/jwtMiddleware');
const app = express.Router();

app.patch('/admin/orders/items', auth.verifyJwt('userLevel: 2'), (req, res) => {
  const result = editData(
      'orderItems',
      req.query.id,
      req.body,
  );

  if (!result) {
    res.status(400).send('Bad request');
  } else {
    res.send(result);
  }
  return;
});

module.exports = app;
