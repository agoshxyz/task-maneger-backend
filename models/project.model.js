const Sequelize = require("sequelize");
const db = require("../config/database.config");
const User = require("../models/user.model")

const Project = db.define("Project", {
  projectId: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  projectName: {
    type: Sequelize.STRING(30),
    allowNull: false,
  },
  projectDescription: {
    type: Sequelize.STRING(300),
    allowNull: false,
  },
  projectSupervisor: {
    type: Sequelize.UUID,
    references: {
      model: User,
      key: "UserID",
    },
  },
  projectDeadline: {
    type: Sequelize.DATEONLY,
    allowNull: true,
  },
  projectStatus: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  IsDeleted: {
    type: Sequelize.STRING(30),
    defaultValue: false
  },
});

Project.sync({ alter: true });
module.exports = Project;