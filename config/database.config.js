const { Sequelize } = require('sequelize');

module.exports = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});