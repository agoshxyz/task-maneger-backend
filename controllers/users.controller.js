const User = require("../models/user.model");
const validateEmail = require("../utils/emailValidation");
const Sequelize = require("sequelize");
const passwordUtils = require("../utils/password");


/**
 * Creats a new user
 * @param {*} req Htpp req
 * @param {*} res 
 */
const create = async (req, res) => {
    const { UserName, UserEmail, UserPassword, UserRole } = req.body;

    try {
        let returnStatusCode = 201;
        let returnData;

        if (!UserName || UserName.length > 30) {
            returnData = { message: "Invalid Name" };
            returnStatusCode = 400;
        }

        if (!validateEmail(UserEmail)) {
            returnData = { message: "Invalid email" };
            returnStatusCode = 400;
        }

        if (!UserPassword || UserPassword.length < 10) {
            returnData = { message: "Invalid Password" };
            returnStatusCode = 400;
        }

        if (!UserRole) {
            returnData = { message: "Invalid user role" };
            returnStatusCode = 400;
        }

        const existingUser = await User.findOne({
            where: {
                UserEmail: UserEmail
            },
        });

        if (existingUser) {
            returnData = { message: "User exist" };
            returnStatusCode = 400;
        }

        const hash = await passwordUtils.generateHash(UserPassword)

        if (returnStatusCode === 201) {
            const newUser = {
                UserName,
                UserEmail,
                UserPassword: hash,
                UserRole
            }
            const user = await User.create(newUser);

            res.status(returnStatusCode).send(user);
        } else {
            res.status(returnStatusCode).send(returnData);
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }

};
const authenticate = async (req, res) => {
    const { UserPassword, } = req.body;
}

const update = async (req, res) => {
    try {
        const { UserID, UserName, UserEmail, UserPassword, UserRole } = req.body;
        let returnStatusCode = 201;
        let returnData;
        const { id } = req.params;
        const currentUser = await User.findOne({

            where: { UserID: id },

        });

        if (!currentUser) {
            returnData = { message: "User not found" };
            returnStatusCode = 404;
        }


        // VALIDARE
        const existingUser = await User.findOne({
            where: { UserEmail: UserEmail },
        });
        if (existingUser && UserEmail != currentUser.UserEmail) {
            returnData = { message: "Invalid EMAIL ADRESS" };
            returnStatusCode = 400;
        }
        const updateUser = {
            UserName,
            UserEmail,
            UserPassword,
            UserRole
        };
        if ((await User.update(updateUser, {

            where: { UserID: id },
        })) != 1) {
            res.status(404).send("Couldn't update user!");
        }
        else {
            res.status(returnStatusCode).send(returnData);
        }




    } catch (err) {
        res.status(500).send({ message: err.message });
    }

}


const deleteUser = async (req, res) => {
    try {

        const { id } = req.params;

        const userInstance = await User.findOne({
            where: { UserID: id }
        })
        if (userInstance) {
            userInstance.set({
                IsDeleted: true
            });
            await userInstance.save();
            res.status(200).send('User deleted succesfully');


        } else {
            res.status(404).send('User 404 Not found');
        }

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const findAll = async (req, res) => {
    try {
        let users = {};
        users = await User.findAll({
            where: { IsDeleted: "false" }
        });
        res.status(200).send({ users });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}



const findOne = async (req, res) => {
    try {
        const user = await User.findOne({

            where: { UserID: req.params.id }


        });

        if (!user) return res.status(404).send("404 User not found!");
        return res.status(200).send({ user });


    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

module.exports = {
    create,
    update,
    deleteUser,
    findAll,
    findOne
}