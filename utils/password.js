const bcrypt = require("bcrypt");

const generateHash = async (password) => await bcrypt.hash(password, bcrypt.genSaltSync(8));

const validPassword = async (password, hash) => await bcrypt.compare(password, hash);

module.exports = {
    generateHash,
    validPassword
}