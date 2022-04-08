const router = require('express').Router();

const user = require('./users');

router.use("/", user)

module.exports = router;