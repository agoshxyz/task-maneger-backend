const express = require("express");
const { append } = require("express/lib/response");
const Logger = require("nodemon/lib/utils/log");
const router = express.Router();
//const users = require("../models/user.model");
const User = require("../controllers/Users.controller.js");

const bodyparser = require("body-parser");

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); //JwToken

router.get("/", (req, res) => {
    res.send('Hello from Express!')
})
router.get("/Users", User.findAll)
router.get("/Users/:UserID", User.findOne)
router.use(bodyparser.json())
    .post("/register", User.create)
router.delete("/Users/:UserID", User.deleteUser)
router.put("/Users/:UserID", User.update)

// const token = generateAccessToken({ username: req.body.username });
// res.json(token);
function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '86400s' });
}

module.exports = router;