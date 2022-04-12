const Sequelize = require("sequelize");
const db = require("../config/database.config");
const User = require("../models/user.model");

const Task = db.define("Task", {
    taskID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    taskName: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    taskDescription: {
        type: Sequelize.STRING(300),
        allowNull: false,
    },
    taskSupervisor: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    taskAssignedUsers: {
        type: Sequelize.UUID,
        // foreignKey: 'UserID'
        references: {
            model: User,
            key: 'UserID'
        }
    },
    taskStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});

Task.sync({ alter: true });
module.exports = Task;