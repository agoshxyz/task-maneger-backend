import User from "../models/user.model";
import { validPassword } from "./password";



const authenticate = async ({ email, password }) => {


    const account = await User.findOne({ email });

    // check account found and verify password
    if (!account || !bcrypt.compareSync(password, account.passwordHash)) {
        // authentication failed
        return false;
    } else {
        // authentication successful
        return true;
    }
}

module.exports = {
    authenticate
}