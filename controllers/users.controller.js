const remove_tryCatch = require("../middlewares/remove_tryCatch");
const _ = require("lodash");
const {generate_token} = require("../auth/jwt");
const { create_entry, find_many } = require("../models/queries/users.queries");

const Success = require("./response_objects/2xx");

module.exports = {
    post_users: remove_tryCatch(async (req, res) => {
        const user = await create_entry(req.body);
        let jwt_token = generate_token(user._id);
        res.status(201).header("X-auth-token",jwt_token).send(Success[201](_.pick(user, ["_id", "username", "email"])));
    }),

    get_users: remove_tryCatch(async (req, res) => res.send(await find_many()))
}