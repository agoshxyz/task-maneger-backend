const express = require('express')
const sequelize = require('./config/database.config.js')
const app = express()
const port = process.env.PORT

sequelize.sync({ force: true });
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
