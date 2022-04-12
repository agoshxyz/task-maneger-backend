const router = require('express').Router();

const user = require('./users');
const project = require('./projects');
const task = require('./tasks');

const auth = require('./auth-routes');

router.get("/", (req, res) => {
    res.send('Hello from Express!')
})

router.use("/users", user)
router.use("/projects", project)
router.use("/tasks", task)

router.use("/user", auth)

module.exports = router;