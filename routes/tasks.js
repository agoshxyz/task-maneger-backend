const express = require("express");
const router = express.Router();

const Task = require("../controllers/tasks.controller");

const bodyparser = require("body-parser");

router.get("/", Task.findAllTask)
router.get("/:TaskID", Task.findOneTask)
router.use(bodyparser.json())
    .post("/createTask", Task.createTask)
router.delete("/:TaskID", Task.deleteTask)
router.put("/:TaskID", Task.updateTask)

module.exports = router;