const express = require("express");
const User = require("../models/user.model");
const db = require("../config/database.config");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
// const {jwtTokens} = require('../utils/jwt-helpers.js');

const router = express.Router();

module.exports = router;