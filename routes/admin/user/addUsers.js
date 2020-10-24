const express = require('express')
const app = express.Router()
const addData = require('../../../controllers/addController')
// const authorization = require('../../../middlewares/jwtMiddleware')

// app.use(authorization.verifyJwt)
app.post('/admin/users', (req, res) => {
    // console.log(authorization)
    const body = req.body
    // body.userId = req.user.id
    const result = addData('user', body)
    if (!result) {
        res.status(400).send('Wrong body')
    } else {
        res.send(result)
        return
    }

})


module.exports = app