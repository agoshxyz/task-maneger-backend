const Sequelize = require("sequelize");
const db = require("../config/database.config");

const Role = db.define("Role", {
    RoleID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    RoleName: Sequelize.STRING(30),

})

Role.sync({ alter: true });
module.exports = Role;