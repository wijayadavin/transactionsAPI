// route if failed to log in:
const express = require('express');
const router = express.Router();


router.get('/failed', (req, res) => {
    res.send('You failed to log in')
  })


module.exports = router;
