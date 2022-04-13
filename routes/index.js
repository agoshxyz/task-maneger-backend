const router = require('express').Router();

var cors = require('cors')
const auth = require('./auth-routes');
const user = require('./users');
const project = require('./projects');
const task = require('./tasks');



router.use(cors())



router.get("/", (req, res) => {
    res.send('Hello from Express!')
})

router.use("/users", user)
router.use("/projects", project)
router.use("/tasks", task)

router.use("/user", auth)

module.exports = router;