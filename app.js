const express = require('express')
const sequelize = require('./config/database.config')
const models = require("./models")
const app = express()
const router = express.Router();
const port = process.env.PORT
const userController = require("./controllers/Users.controller");

const bodyparser = require("body-parser");

const routes = require("./routes/index")
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

// router.post('/register', userController.create)

app.use(router);
// app.get('/', (req, res) => {
//   res.send('Hello from Express!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
