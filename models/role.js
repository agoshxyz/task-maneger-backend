const Sequelize = require("sequelize");
const db = require("../config/database.config");

const Role = db.define("Role", {
    RoleID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    RoleAdministrator: Sequelize.STRING(30),
    RoleManager: Sequelize.STRING(30),
    RoleUser: Sequelize.STRING(30),
})

Role.sync({ alter: true });
module.exports = Role;