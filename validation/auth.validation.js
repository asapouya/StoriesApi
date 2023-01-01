const joi = require("joi");

module.exports = {
    
    validate_auth: async (obj) => {
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