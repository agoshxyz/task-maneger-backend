const express = require("express");
const router = express.Router();
const User = require("../controllers/users.controller");

const auth = require("../middleware/auth")
const bodyparser = require("body-parser");


router.post('/login', User.authenticate);

router.get("/", auth, User.findAll)
router.get("/:id", auth, User.findOne)
router.use(bodyparser.json())
    .post("/register", User.create)
router.delete("/:id", auth, User.deleteUser)
router.put("/:id", auth, User.update)

module.exports = router;