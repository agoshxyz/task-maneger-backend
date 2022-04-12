const express = require("express");
const router = express.Router();

const Task = require("../controllers/tasks.controller");

const bodyparser = require("body-parser");

router.get("/", Task.findAllTask)
router.get("/:id", Task.findOneTask)
router.use(bodyparser.json())
    .post("/createTask", Task.createTask)
router.delete("/:id", Task.deleteTask)
router.put("/:id", Task.updateTask)

module.exports = router;