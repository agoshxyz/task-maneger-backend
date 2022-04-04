const express = require('express')
// const sequelize = require('./config/database.config.js')
const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
