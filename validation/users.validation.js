const joi = require("joi");
const password_complexity = require("joi-password-complexity");

module.exports = {
    async validate_users (user_object){

        let schema = joi.object({
            username: joi.string()
                .regex(/^\S*$/)
                .required()
                .min(3)
                .max(32),
            email: joi.string()
                .email()
                .required(),
            password: password_complexity().required()
        })
        return await schema.validateAsync(user_object);
    }
}