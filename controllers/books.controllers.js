const remove_tryCatch = require("../middlewares/remove_tryCatch");
const _ = require("lodash");
const Success = require("./response_objects/2xx");
const {create_entry} = require("../models/queries/books.queries");

module.exports = {
    post_books: remove_tryCatch(async (req, res) => {
        const book = await create_entry(req.body);
        res.status(201).send(Success[201](_.pick(book, ["_id","title", "author", "year_of_publication", "publisher", "genre", "summary"])));
    })
}