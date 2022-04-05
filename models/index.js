const { Sequelize } = require('sequelize');
const sequelize = require('../config/database.config');

const user = require('./user.model');
const proiect = require('./project.model');
const task = require('./task.model');


///creare tabele 


const models = {
    User: new user(sequelize, Sequelize.DataTypes),
    Project: new proiect(sequelize, Sequelize.DataTypes),
    Task: new task(sequelize, Sequelize.DataTypes)

};

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

module.exports = models;