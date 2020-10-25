const express = require('express');
const router = express.Router();
const getData = require('../../controllers/getController')
const editData = require('../../controllers/editController');
const auth = require('../../middlewares/jwtMiddleware');

router.patch('/profile',
    auth.verifyJwt('userLevel: 1'), (req, res) => {
        const result = editData('users', req.query.id, req.body);
        const body = req.body
        const username = getData('users', body.username)

        if (username && Object.keys(username).length) {
            res.status(400).send('Username is existed')
        } else if (!result) {
            res.status(400).send('Bad request');
        } else {
            res.send(result);
        }
        return;
    });


module.exports = router;