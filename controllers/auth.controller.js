const remove_tryCatch = require("../middlewares/remove_tryCatch");
const { validate_auth } = require("../validation/auth.validation");
const {generate_admin_token, generate_token, verify_token} = require("../auth/jwt");
const ClientError = require("./response_objects/4xx");
const Success = require("./response_objects/2xx");
const {find_one, find_one_and_update} = require("../models/queries/users.queries");
const {compare} = require("../models/queries/hash");

module.exports = {
    post_auth: remove_tryCatch(async (req, res) => {

        await validate_auth(req.body);
        
        const user = await find_one({email: req.body.email});
        
        if(!user) return res.status(404).send(ClientError[404]({ message: "User not found." }));
        const valid_password = await compare(req.body.password, user.password);
        if(!valid_password) return res.status(404).send(ClientError[404]({ message: "User not found." }));
        if(!user.confirmed) {
            //confirmation email
            const token = generate_token(user._id);
            res.status(400).send(ClientError[400](`Please Confirm your account to login. nodemailer doesn't work so here's your link => http://localhost:8888/v1/auth/confirmation/${token}`));
        }
        let token = null;
        if(user.admin){
            console.log(true);
            token = generate_admin_token(user.id, user.admin);
        }else{
            token = generate_token(user._id);
        }
        res.status(204).header("X-auth-token", token).send();
    }),

    update_confirmation: remove_tryCatch(async (req, res) => {
        const token = req.params.token;
        const { _id } = verify_token(token);
        await find_one_and_update({_id: _id}, {confirmed: true});
        res.status(200).send(Success[200]("Account confirmed."));
    })
}