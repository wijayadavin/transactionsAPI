
const express = require('express');
const addData = require('../../../controllers/addController');
const getData = require('../../../controllers/getController');
const uid = require('uid');
const router = express.Router();
const auth = require('../../../middlewares/jwtMiddleware');
const userPermission = require('../../../controllers/userController');


router.post('/admin/users'), userPermission(['admin']), (req, res) => {
  // Firstly, let's check if username has exist:
  isUsernameExist = getData('users', {username: req.body.username});
  if (isUsernameExist && isUsernameExist.length) {
    res.status(409).send('The same username has exist');
  }
  req.body.id = `/u/${uid()}`;
  const result = addData('users', req.body);

  // If ok, continue:
  if (result) {
    res.send(result);
  } else {
    res.status(400).send('Bad Request');
  }
};

module.exports = router;
