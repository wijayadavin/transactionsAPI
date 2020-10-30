const express = require('express');
const getData = require('../../../controllers/getController');
const auth = require('../../../middlewares/jwtMiddleware');
const urlencodedParser = require('body-parser').urlencoded({ extended: false })
const router = express.Router();


router.get('/auth/login', (req, res) => {
  const users = getData('users')
  res.status(200).render('login');
})

router.post('/auth/login', urlencodedParser, (req, res) => {
  if (req.body.username && req.body.password) {
    const result = getData('users', req.body)[0];

    if (result) {
    // Set a token for admin users:
      if (req.body.username == 'admin') {
        const payload = {
          id: result.id,
          role: ['user', 'admin'],
        };
        result.token = auth.signJwt(payload);
        return res.header('Authorization', result.token).redirect(`../../u/${result.username}`);
      }

      // if not admin then set a token for normal users:
      const payload = {
        id: result.id,
        role: 'user',
      };
      result.token = auth.signJwt(payload);
      return res.header('Authorization', result.token).redirect(`../../u/${result.username}`);
    } else {
      res.status(400).send('Bad request');
    }
  } else {
    res.status(400).send('Please insert username & password');
  }
});


module.exports = router;
