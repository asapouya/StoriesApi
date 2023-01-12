const joi = require("joi");

module.exports = {
    
    async validate_auth (obj) {
        const schema = joi.object({
            email: joi.string()
                .email()
                .required(),
            password: joi.string()
                .required()
        })
        return await schema.validateAsync(obj);
    }
}