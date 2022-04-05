const Sequelize = require("sequelize");
const db = require("../config/database.config");
const bcrypt = require("bcrypt");

const User = db.define("User", {
    UserID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,

    },
    UserName: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    UserEmail: Sequelize.STRING(50),
    UserPassword: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    UserRole: Sequelize.ENUM('Administrator', 'User', 'Manager'),
    UserAvatar: Sequelize.STRING(300),

}, {
    freezeTableName: true,
    instanceMethods: {
        generateHash(password) {
            return bcrypt.hash(password, bcrypt.genSaltSync(8));
        },
        validPassword(password) {
            return bcrypt.compare(password, this.password);
        }
    }
});

User.sync({ alter: true });
module.exports = User;