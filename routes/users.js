const express = require("express");
const router = express.Router();
const User = require("../controllers/users.controller");

const bodyparser = require("body-parser");


router.post('/login', User.authenticate);

router.get("/", User.findAll)
router.get("/:id", User.findOne)
router.use(bodyparser.json())
    .post("/register", User.create)
router.delete("/:id", User.deleteUser)
router.put("/:id", User.update)

module.exports = router;