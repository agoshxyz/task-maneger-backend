const Sequelize = require("sequelize");
 const db = require("../config/database.config");

 const Project = db.define("Project", {
   projectName: {
     type: Sequelize.STRING(30),
     allowNull: false,
   },
   projectDescription: {
     type: Sequelize.STRING(300),
     allowNull: false,
   },
   projectSupervisor: {
     type: Sequelize.STRING(300),
     allowNull: false,
   },
   projectDeadline: {
     type: Sequelize.DATEONLY,
     allowNull: true,
   },
   projectStatus: {
     type: Sequelize.BOOLEAN,
     defaultValue: false,
     allowNull: false,
   },
 });

 Project.sync({ alter: true });
 module.exports = Project;