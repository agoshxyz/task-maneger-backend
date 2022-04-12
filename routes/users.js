const express = require("express");
const { append } = require("express/lib/response");
const Logger = require("nodemon/lib/utils/log");
const router = express.Router();
//const users = require("../models/user.model");
const Tasks = require("../controllers/tasks.controller");

const bodyparser = require("body-parser");

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); //JwToken

router.get("/", Tasks.findAllTask)
router.get("/:UserID", Tasks.findOneTask)
router.use(bodyparser.json())
    .post("/register", Tasks.createTask)
router.delete("/:UserID", Tasks.deleteTask)
router.put("/:UserID", Tasks.updateTask)

// const token = generateAccessToken({ username: req.body.username });
// res.json(token);
function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '86400s' });
}

module.exports = router;