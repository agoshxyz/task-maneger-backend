const Sequelize = require("sequelize");
const db = require("../config/database.config");

const task = db.define("Task", {
    taskName: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    taskDescription: {
        type: Sequelize.STRING(300),
        allowNull: false,
    },
    taskSupervisor: {
        type: Sequelize.STRING(300),
        allowNull: false,
    },
    taskAssignedusers: {
        type: Sequelize.STRING(100),
        //????
        allowNull: false,
    },
    taskStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
});

task.sync({ alter: true });
module.exports = task;