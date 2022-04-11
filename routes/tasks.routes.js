const Task = require("../models/task.model");
const tasksController = require("./controllers/tasks.controller");
const express = require('express')
const app = express()

// Get tasks routes list
router.get('/', (req, res) =>
    Tasks.findAll()
        .then(tasks => res.render('task', {
            tasks
        }))
        .catch(err => res.render('error', { error: err })));

// Display add tasks form
router.get('/add', (req, res) => res.render('add'));
app.get("/task", task.findAll);
app.put("task/:update", task.update);
app.put("task/:deleteTask", tasksController.deleteTask);

// Add a task
router.post('/add', Task.create);
router.put('task/update', Task.update);
// Search for task
router.tas('/search', (req, res) => {
    let { term } = req.query;

});
module.exports = router;