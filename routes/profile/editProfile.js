const express = require('express');
const router = express.Router();
const getData = require('../../controllers/getController')
const editData = require('../../controllers/editController');
const auth = require('../../middlewares/jwtMiddleware');

router.patch('/profile',
    auth.verifyJwt('userLevel: 1'), (req, res) => {

        // search if username is existed in database
        const body = req.body
        const isUsernameExist = getData('users', { username: body.username })
        if (isUsernameExist && isUsernameExist.length) {
            //if existed, send this
            res.status(400).send('Username is existed')
        }

        //if passed, users can edit their username
        req.query.id = req.user.id
        const result = editData('users', req.query.id, req.body);

        if (!result) {
            //if false
            res.status(400).send('Bad request');
        } else {
            //if true
            res.send(result);
        }
        return;
    });


module.exports = router;