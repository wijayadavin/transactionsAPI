const express = require('express');
const { restart } = require('nodemon');
const getData = require('../../controllers/getController');
const auth = require('../../middlewares/jwtMiddleware');
const app = express.Router();


app.post('/auth/login', (req, res) => {
  if (req.body.username && req.body.password) {
    const result = getData('users', req.body)[0];

    if (result) {
    // Set a token for admin users:
      if (req.body.username == 'admin') {
        const payload = {
          id: result.id,
          permissions: ['userLevel: 1', 'userLevel: 2'],
        };
        result.token = auth.signJwt(payload);
        return res.send(result);
      }

      // if not admin then set a token for normal users:
      const payload = {
        id: result.id,
        permissions: 'userLevel: 1',
      };
      result.token = auth.signJwt(payload);
      res.send(result);
    } else {
      res.status(400).send('Bad request');
    }
  } else {
    res.status(400).send('Please insert username & password');
  }
});


module.exports = app;
