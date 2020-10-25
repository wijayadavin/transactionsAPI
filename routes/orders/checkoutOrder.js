const express = require('express');
const editData = require('../../controllers/editController');
const auth = require('../../middlewares/jwtMiddleware');
const app = express.Router();
const getData = require('../../controllers/getController');

app.patch('/orders',
    auth.verifyJwt('userLevel: 1'), (req, res) => {
      foundData = getData('orders', {id: req.query.id});

      if (foundData && foundData.id == req.user.id) {
        const result = editData(
            'orders',
            req.query.id,
            {
              id: req.query.id,
              userID: req.user.id,
              status: 1,
              nominal: foundData.nominal,
              date: foundData.date,
            },
        );
        if (!result) {
          res.status(400).send('Bad request');
        } else {
          res.send(result);
        }
      } else {
        res.send(404).send('Error: Not found');
      }

      return;
    });

module.exports = app;
