const express = require('express');
const router = express.Router();


router.post('/auth/logout', (req, res) => {
    req.session = null;
    req.logout();
    req.redirect('/');
});


module.exports = router;
