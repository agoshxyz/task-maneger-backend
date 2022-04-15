const Task = require("../models/task.model");
const User = require("../models/user.model");
const validateEmail = require("../utils/emailValidation");
const Project = require("../models/project.model");

//Create new task
const createTask = async (req, res) => {
    const {
        taskName,
        taskDescription,
        taskSupervisor,
        taskAssignedUsers,
        taskDeadline
    } = req.body;

    try {
        let returnStatusCode = 201;
        let returnData;

        const existingUser = await User.findAll({
            where: { UserID: taskAssignedUsers },
        })

        //VALIDATIONS taskname+assigneduser
        if (taskName == null || taskName.length > 30) {
            returnData = { message: "Invalid task name." };
            returnStatusCode = 400;
        }

        if (!existingUser) {
            returnData = { message: "Task are not avaible." };
            returnStatusCode = 400;
        }

        if (returnStatusCode === 201) {
            const newTask = {
                taskName,
                taskDescription,
                taskSupervisor,
                taskAssignedUsers,
                taskDeadline
            };
            const task = await Task.create(newTask);
            res.status(returnStatusCode).send({
                task
            });
        } else {
            res.status(returnStatusCode).send(returnData);
        }
    }
    catch (err) {
        console.error(err)
        return res.status(500).send({ message: err.message });
    }
};


//Update existing task
const updateTask = async (req, res) => {
    try {
        const { taskName, taskDescription, taskSupervisor, taskAssignedUsers, taskStatus, taskDeadline } = req.body;
        const { id } = req.params
        let returnStatusCode = 201;
        let returnData;
        const currentTask = await Task.findOne({
            where: { taskID: id },
        });

        if (!currentTask) return res.status(404).send("Task not found.");
        //VALIDATIONS
        if (taskName == null || taskName.length > 30) {
            returnData = { message: "Invalid TASK." };
            StatusCode = 400;
        }
        if (taskDescription == null || taskDescription.length > 300) {
            returnData = { message: "Invalid user ID." };
            StatusCode = 400;
        }
        if (taskAssignedUsers == null || taskAssignedUsers.length > 100) {
            returnData = { message: "Invalid Assigned Users." };
            StatusCode = 400;
        }
        if (taskSupervisor == null || taskSupervisor.length > 30) {
            returnData = { message: "Invalid supervisor." };
            StatusCode = 400;
        }
        const updatedTask = {
            taskName,
            taskDescription,
            taskAssignedUsers,
            taskSupervisor,
            taskDeadline
        };
        if (
            (await Task.update(updatedTask, {
                where: { taskID: id },
            })) != 1
        )
            return res.status(404).send("Couldn't update task!");
        return res.status(200).send("Task successfully updated!");
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};


const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const taskInstance = await Task.findOne({
            where: { taskID: id }
        })
        if (taskInstance) {
            taskInstance.set({
                IsDeleted: true
            });
            await taskInstance.save();
            res.status(200).send('Task deleted succesfully.');

        } else {
            res.status(404).send('Task 404 Not found.');
        }

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const findAllTask = async (req, res) => {
    try {
        let tasks = {};
        tasks = await Task.findAll({
            where: { IsDeleted: "false" }
        });
        return res.status(200).send(tasks);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};


const findOneTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            where: { taskID: req.params.id }
        });
        if (!task) return res.status(404).send("404 Task not found!");
        return res.status(200).send({ task });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}


const findAllTaskByProject = async (req, res) => {
    try {
        let tasks = {};
        tasks = await Task.findAll({
            where: { task_fk_project: req.params.id }
        });
        return res.status(200).send(tasks);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};



module.exports = {
    createTask,
    updateTask,
    deleteTask,
    findAllTask,
    findOneTask,
    findAllTaskByProject
}