const Sequelize = require("sequelize");
const db = require("../config/database.config");
const bcrypt = require("bcrypt");
const role = require("./role");



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
    UserRole: {
        type: Sequelize.STRING(50),
    },
    UserAvatar: Sequelize.STRING(300),

    IsDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },

},
    {
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


User.hasMany(role, {
    foreignKey: 'RoleID',
})
role.belongsTo(User);

User.sync({ alter: true });
module.exports = User;