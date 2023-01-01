const remove_tryCatch = require("../middlewares/remove_tryCatch");
const { validate_users } = require("../validation/users.validation");
const Users = require("../models/users.model");
const _ = require("lodash");
const jwt_token_generate = require("../auth/jwt_token_generate");

//Seccessful response object - 2xx
const Success = new require("./response_objects/2xx");
const successResponseObj = new Success();

module.exports = {
    post_users: remove_tryCatch(async (req, res) => {
        await validate_users(req.body);
        const user = new Users(_.pick(req.body, ["username", "email", "password"]));
        user.password = await user.hash();
        let {_id} = await user.save();
        let jwt_token = jwt_token_generate(_id);
        res.status(201).header("X-auth-token",jwt_token).send(successResponseObj[201](_.pick(user, ["_id", "username", "email"])));
    })
}