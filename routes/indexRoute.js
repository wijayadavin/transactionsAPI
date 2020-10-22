const express = require('express')
const app = express.Router()

app.get('/', (req, res) => {
  res.send("hello world")
})

module.exports = app