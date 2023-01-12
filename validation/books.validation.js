const joi = require("joi");

module.exports = {
    async validate_books (obj) {

        const books_schema = joi.object({

            author: joi.string()
                .required()
                .max(256),
            title: joi.string()
                .required()
                .max(128),
            year_of_publication: joi.number()
                .required(),
            publisher: joi.string()
                .required()
                .max(128),
            genre: joi.array()
                .items(joi.string().required())
                .required(),
            summary: joi.string()
                .required()
                .max(4096)
        })
        return await books_schema.validateAsync(obj);
    }
}