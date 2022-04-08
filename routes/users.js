const express = require("express");
const { append } = require("express/lib/response");
const Logger = require("nodemon/lib/utils/log");
const router = express.Router();
// const users = require("../models/user.model");

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
router
    .route("/name")
    .get((req, res) => {
        ///user/name
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
// router
//     .delete('/:id', (req, res) => {
//         const { id } = req.params;
//         // const user = req.body;
//         users = UserUserID.filter((User) => User.UserID !== id)

//         res.send(`User with the id ${id} deleted from the database.`);
//     })
// router
//     .put('/:id', (req, res) => {
//         const { id } = req.params;
//         // const { Id, nume } = req.body;

//         const userToBeUpdated = UserUserID.find((User) => User.UserID === id);
//     })

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '86400s' });
}


module.exports = router;