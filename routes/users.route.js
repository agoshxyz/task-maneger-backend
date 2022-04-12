const User = require("../controllers/users.controller.js");

const express = require('express')
const app = express()

module.exports = (app) => {

    app.post("/register", User.create);

    app.get("/Users", User.findAll);

    app.put("/Users/UserID", User.update);

    app.delete("/Users/:UserID", User.delete);

    app.get("/Users/:UserID", User.findOne);
};
