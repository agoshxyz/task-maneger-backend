const express = require('express')
const sequelize = require('./config/database.config')
const models = require("./models")
const app = express()
const port = process.env.PORT

const routes = require("./routes")
app.use("/", routes);
//use the users.js file to handle
//endpoints that start with /users

sequelize.sync();
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
