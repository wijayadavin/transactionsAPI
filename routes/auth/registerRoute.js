const express = require('express')
const addData = require('../../controllers/addController')
const getData = require('../../controllers/getController')
const app = express.Router()
// uid is a id generator library
// Reference: https://www.npmjs.com/package/uid
const uid = require('uid')

app.post('/auth/register', (req, res) => {
  const body = req.body
  const isUserExists = getData('user', body)
  if (!isUserExists) {
    body.id = uid()
    const result = addData('user', body)
    if (result) {
      res.send(result)
    } else {
      // called if request body object key is lacking
      res.status(400).send('Bad request')
    }
  } else {
    // called if user is already exists
    res.status(409).send('User exists, please log in')
  }
})

module.exports = app