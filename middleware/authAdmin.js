const authAdmin = async (req, res, next) => {
    try {
        if (req.user.role != "Admin") {
            return res
                .status(403)
                .json({ msg: "Forbidden: only an Admin can perform this action" });
        }
        return next();
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};
module.exports = authAdmin;
