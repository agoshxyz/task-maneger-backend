const express = require("express");
const { append } = require("express/lib/response");
const Logger = require("nodemon/lib/utils/log");
const router = express.Router();
//const users = require("../models/user.model");
const Project = require("../controllers/Users.controller.js");

const bodyparser = require("body-parser");

router.get("/", Project.findAll)
router.get("/:ProjectID", Project.findOne)
router.use(bodyparser.json())
    .post("/createProject", Project.create)
router.delete("/:ProjectID", Project.deleteUser)
router.put("/:ProjectID", Project.update)

module.exports = router;