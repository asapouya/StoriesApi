const joi = require("joi");

module.exports = {
    async validate_comments (obj) {
        const schema = joi.object({
            comment: joi.string()
                .required()
                .max(4096)
        });

    return await schema.validateAsync(obj);
    }
}