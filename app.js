const express = require('express')
const sequelize = require('./config/database.config')
const models = require("./models")
const app = express()
const router = express.Router();
const port = process.env.PORT
const userController = require("./controllers/Register.controller");
const bodyparser = require("body-parser")
sequelize.sync();
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(bodyparser.json());
router.post('/register', userController.create)

app.use(router);

app.post('/', (req, res) => {
  res.send('Hello from Express!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
