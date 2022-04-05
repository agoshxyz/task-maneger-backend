const { Sequelize } = require('sequelize');
const sequelize = require('../config/database.config');

const user = require('./user.model');


///creare tabele 


const models = {
    User: new user(sequelize, Sequelize.DataTypes),

};

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

module.exports = models;