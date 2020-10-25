const express = require('express');
const getData = require('../../controllers/getController');
const auth = require('../../middlewares/jwtMiddleware');
const app = express.Router();


app.post('/auth/login', (req, res) => {
  const result = getData('users', req.body);

  if (result) {
    // if user's level is 2, set a token for admin users:
    if (req.body.level === 2) {
      const payload = {
        id: result[0].id,
        permissions: 'userLevel: 2',
      };
      result[0].token = auth.signJwt(payload);
      return res.send(result);
    }

    // if not admin then set a token for normal users:
    const payload = {
      id: result[0].id,
      permissions: 'userLevel: 1',
    };
    result[0].token = auth.signJwt(payload);
    res.send(result);
  } else {
    res.status(400).send('Bad request');
  }
},
);


module.exports = app;
