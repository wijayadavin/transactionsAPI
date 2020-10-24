const express = require('express');
const getData = require('../../controllers/getController');
const auth = require('../../middlewares/jwtMiddleware');
const jwtConfig = require('../../jwtConfig');
const app = express.Router();


app.post('/auth/login', (req, res) => {
  const result = getData('user', req.body);
  if (result) {
    // Set a token for admin users:
    if (result.username == 'admin') {
      const payload = {
        username: req.body.username,
        permissions: 'userLevel: 2',
      };
      result.token = auth.signJwt(payload);
      res.send(result);
    }
    // if not admin then set a token for normal users:
    const payload = {
      username: req.body.username,
      permissions: 'userLevel: 1',
    };
    result.token = auth.signJwt(payload);
    res.send(result);
  } else {
    res.status(400).send('Bad request');
  }
},
);


module.exports = app;
