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

    if (!projectName || projectName.length < 3) {
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

const updateProject = async (req, res) => {
  try {
    const {
      projectName,
      projectDescription,
      projectSupervisor,
      projectDeadline,
      projectStatus,
    } = req.body;
    const { id } = req.params;
    let returnStatusCode = 201;
    let returnData;
    const currentProject = await Project.findOne({
      where: { projectId: id },
    });

    if (!currentProject) return res.status(404).send("Project not found.");

    if (!projectName || projectName.length < 3) {
      returnData = { message: "Project name cannot be less than 3 chars" };
      returnStatusCode = 400;
    }

    if (projectName.length > 30) {
      returnData = { message: "Project name cannot have more than 30 chars" };
      returnStatusCode = 400;
    }

    const updatedProject = {
      projectName,
      projectDescription,
      projectSupervisor,
      projectDeadline,
      projectStatus,
    };

    if (
      (await Project.update(updatedProject, {
        where: { projectId: id },
      })) !== 0
    )
      // ) {
      //   return res.status(404).send("Project could not be updated.");
      // }
      return res.status(201).send({ message: "Project updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: err.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const projectInstance = await Project.findOne({
      where: { projectId: id },
    });
    if (projectInstance) {
      projectInstance.set({
        IsDeleted: true,
      });
      await projectInstance.save();
      res.status(200).send({ message: "Project deleted successfully" });
    } else {
      res.status(404).send({ message: "Project was not found" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findOneProjects = async (req, res) => {
  try {
    const projects = await Project.findOne({
      where: { projectId: req.params.id }
    });
    if (!projects) return res.status(404).send("404 Project not found!");
    return res.status(200).send({ projects });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

const getAllProjects = async (req, res) => {
  try {
    let projects = {};
    projects = await Project.findAll({
      where: { IsDeleted: "false" }
    });
    return res.status(200).send(projects);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  findOneProjects
};
