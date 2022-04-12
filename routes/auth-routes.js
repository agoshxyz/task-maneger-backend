const express = require("express");
const User = require("../models/user.model");
const db = require("../config/database.config");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
// const {jwtTokens} = require('../utils/jwt-helpers.js');

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { UserEmail, UserPassword } = req.body;
        const existingUser = await User.findOne({
            where: {
                UserEmail: UserEmail
            },
        });
        res.status(200).json("Mesaj te-ai logat!")
    } catch (error) {
        console.error("[ERROR]: ", error)
        res.sendStatus(500)
    }
});

module.exports = router;