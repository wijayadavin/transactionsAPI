const express = require('express');
const router = express.Router();
const getData = require('../../controllers/getController');
const editData = require('../../controllers/editController');
const auth = require('../../middlewares/jwtMiddleware');

router.patch('/u/:username',
    auth.verifyJwt('role: user'), (req, res) => {
      // Check param if found or not
      const foundUser = getData('users', {id: req.user.id}[0]);
      if (!foundUser || foundUser.length == 0) {
        return res.status(400).send('Bad request');
      }

      // Check if requested profile to edit is matched with username from token:
      if (req.params.username != foundUser) {
        return res.status(401).send('Unauthorized');
      };

      // Search if username is existed in database:
      const isUsernameExist = getData('users', {username: req.body.username});
      if (isUsernameExist & isUsernameExist.length > 1) {
        return res.status(400).send('Username is existed');
      }

      // if passed, users can edit their username:
      req.body.id = req.user.id;
      const result = editData('users', req.body.id, req.body);

      if (!result) {
        // if false
        res.status(400).send('Bad request');
      } else {
        // if true
        res.send(result);
      }
      return;
    });


module.exports = router;
