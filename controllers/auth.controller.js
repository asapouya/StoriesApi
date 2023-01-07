const remove_tryCatch = require("../middlewares/remove_tryCatch");
const Users = require("../models/users.model");
const { validate_auth } = require("../validation/auth.validation");
const bcrypt = require("bcrypt");
const jwt_token_generate = require('../auth/jwt_token_generate');
const jwt_token_generate_admin = require("../auth/jwt_token_generate_admin");
const ClientError = require("./response_objects/4xx");

module.exports = {
    post_auth: remove_tryCatch(async (req, res) => {
        await validate_auth(req.body);
        const user = await Users.findOne({
            email: req.body.email
        }).collation({locale: "en_US", strength: 2});
        if(!user) return res.status(404).send(ClientError[404]({ message: "User not found." }));
        const valid_password = await bcrypt.compare(req.body.password, user.password);
        if(!valid_password) return res.status(404).send(ClientError[404]({ message: "User not found." }));
    
        let token = null;
        if(user.admin){
            console.log(true);
            token = jwt_token_generate_admin(user.id, user.admin);
        }else{
            token = jwt_token_generate(user._id);
        }
        res.status(204).header("X-auth-token", token).send();
    })
}