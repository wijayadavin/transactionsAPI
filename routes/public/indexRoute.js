const express = require('express');
const getData = require('../../controllers/getController');
const router = express.Router();


router.get('/', (req, res) => {
  const users = getData('users')
  res.status(200).render('index', { "users": users });
});

module.exports = router;
