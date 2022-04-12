const express = require('express')
const sequelize = require('./config/database.config')
const models = require("./models")
const app = express()
const port = process.env.PORT


const routes = require("./routes/index")

const bodyparser = require("body-parser");

sequelize.sync();
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(bodyparser.json())
app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})