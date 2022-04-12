const express = require("express");
const router = express.Router();
const Project = require("../controllers/projects.controller");

const bodyparser = require("body-parser");

router.get("/", Project.getAllProjects)
// router.get("/:id", Project.findOne)
router.use(bodyparser.json())
    .post("/createProject", Project.createProject)
router.delete("/:id", Project.deleteProject)
router.put("/:id", Project.updateProject)

module.exports = router;