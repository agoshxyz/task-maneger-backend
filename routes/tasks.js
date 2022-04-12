const express = require("express");
const { append } = require("express/lib/response");
const Logger = require("nodemon/lib/utils/log");
const router = express.Router();
//const users = require("../models/user.model");
const Task = require("../controllers/Users.controller.js");

const bodyparser = require("body-parser");

router.get("/", Task.findAll)
router.get("/:TaskID", Task.findOne)
router.use(bodyparser.json())
    .post("/createTask", Task.create)
router.delete("/:TaskID", Task.deleteUser)
router.put("/:TaskID", Task.update)

module.exports = router;