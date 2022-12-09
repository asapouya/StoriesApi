const { validate_users } = require("../validation/users.validation");
const remove_tryCatch = require("../middleware/remove_tryCatch");
const Users = require("../models/users.model");
const _ = require("lodash");

module.exports = {

    post_users: remove_tryCatch(async (req, res) => {
        await validate_users(req.body);
        const user = new Users(_.pick(req.body, ["user_name", "email", "password"]));
        user.password = user.hash();
        await user.save();
        res.send(user);
    })
}