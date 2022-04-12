const User = require("../models/user.model");
const validateEmail = require("../utils/emailValidation");

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
            returnData = { message: "Invalid Name eqw" };
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

        if (returnStatusCode === 201) {
            const newUser = {
                UserName,
                UserEmail,
                UserPassword,
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

const update = async (req, res) => {
    try {
        const { nume, email, parola, role } = req.body;

        const currentUser = await User.findOne({
            where: { UserID: req.params.UserID },
        });

        if (!currentUser) return res.status(404).send("404 USER NOT FOUND !!!!");


        // VALIDARE
        if (nume == null || nume.length > 30)
            return res.status(400).send("Invalid Name.");
        if (validateEmail != email)
            return res.status(400).send("Invalid Email")
        const existingUser = await User.findOne({
            where: { email: email },
        });
        if (existingUser && email != currentUser.email)
            return res.status(400).send({
                message: "invalid email adress"
            })

        const updateUser = {
            nume,
            email,
            parola,
            role,
        };
        if ((await User.update(updateUser, {
            where: { UserID: req.params.UserID },
        })) != 1)
            return res.status(404).send("Couldn't update user!");
        return res.status(200).send("User successfully updated!");



    } catch (err) {
        return res.status(500).send({ message: err.message });
    }

}


const deleteUser = async (req, res) => {
    try {
        const currentUser = await User.findOne({
            where: { UserID: req.params.UserID },//
        });

        if (!currentUser) return res.status(404).send("404 User not found!");

        if ((await User.destroy({ where: { UserID: req.params.UserID } })) != 1)
            return res.status(404).send('User can not be deleted');
        return res.status(200).send('User deleted succesfully');




    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

const findAll = async (req, res) => {
    try {
        let users = {};
        users = await User.findAll();
        return res.status(200).send({ users });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}



const findOne = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { UserID: req.params.UserID }
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