const express = require('express')
const app = express.Router()
const db = require('../../../controllers/getController')
const authorization = require('../../../middlewares/jwtMiddleware')

app.get('/admin/users', authorization, (req, res) => {
    const query = req.query
    const id = req.user.id
    query.userId = id
    const result = db.get('user', query)
    if (!result) {
        res.status(404).send('Data not found')
    }
    res.send(result)
})


module.exports = app