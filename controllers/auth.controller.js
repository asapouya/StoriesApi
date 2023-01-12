const remove_tryCatch = require("../middlewares/remove_tryCatch");
const { validate_auth } = require("../validation/auth.validation");
const {generate_admin_token, generate_token} = require("../auth/jwt");
const ClientError = require("./response_objects/4xx");
const {find_one} = require("../models/queries/users.queries");
const {compare} = require("../models/queries/hash");

module.exports = {
    post_auth: remove_tryCatch(async (req, res) => {
        await validate_auth(req.body);
        const user = await find_one({email: req.body.email});
        if(!user) return res.status(404).send(ClientError[404]({ message: "User not found." }));
        const valid_password = await compare(req.body.password, user.password);
        if(!valid_password) return res.status(404).send(ClientError[404]({ message: "User not found." }));
        let token = null;
        if(user.admin){
            console.log(true);
            token = generate_admin_token(user.id, user.admin);
        }else{
            token = generate_token(user._id);
        }
        res.status(204).header("X-auth-token", token).send();
    })
}