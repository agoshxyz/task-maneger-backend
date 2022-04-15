const router = require('express').Router();

var cors = require('cors')
const user = require('./users');
const project = require('./projects');
const task = require('./tasks');
const auth = require("../middleware/auth")



router.use(cors())



router.get("/", (req, res) => {
    res.send('Hello from Express!')
})

router.use("/users", user)
router.use("/projects", auth, project)
router.use("/tasks", auth, task)

router.use("/user", auth)

module.exports = router;