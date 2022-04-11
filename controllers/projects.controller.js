const Project = require("../models/project.model");
const User = require("../models/user.model");

const createProject = async (req, res) => {
  const {
    projectName,
    projectDescription,
    projectSupervisor,
    projectDeadline,
    projectStatus,
  } = req.body;

  try {
    let returnStatusCode = 201;
    let returnData;

    // const existingProject = await User.findAll({
    //   where: { UserID: projectSupervisor },
    // });

    if ((!projectName || projectName.length < 3)) {
      returnData = { message: "Project name cannot be less than 3 chars" };
      returnStatusCode = 400;
    }
    if (projectName.length > 30) {
      returnData = { message: "Project name cannot have more than 30 chars" };
      returnStatusCode = 400;
    }

    // if (existingProject) {
    //   returnData = { message: "Project already exists" };
    //   returnStatusCode = 400;
    // }
    if (returnStatusCode === 201) {
      const newProject = {
        projectName,
        projectDescription,
        projectSupervisor,
        projectDeadline,
        projectStatus,
      };

      const project = await Project.create(newProject);
      res.status(returnStatusCode).send({
        project,
      });
    } else {
      res.status(returnStatusCode).send(returnData);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: err.message });
  }
};
module.exports = {
  createProject,
};
