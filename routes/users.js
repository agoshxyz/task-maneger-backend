const express = require("express");
const { append } = require("express/lib/response");
const Logger = require("nodemon/lib/utils/log");
const router = express.Router();

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
router
    .route("/name")
    .get((req, res) => {
        ///users/name
        res.send("hi get /users/name");
    })
router
    .route("/name")
    .post((req, res) => {
        res.send("hi post /users/name");
        const token = generateAccessToken({ username: req.body.username });
        res.json(token);
    });

router
    .route("/email")
    .get((req, res) => {
        res.send("hi get /users/email");
    })
router
    .route("/email")
    .post((req, res) => {
        res.send("hi post /users/email");
    });

router
    .route("/role")
    .get((req, res) => {
        res.send("hi get /users/role");
    })
router
    .route("/role")
    .post((req, res) => {
        res.send("hi post /users/role");
    });

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}


module.exports = router;