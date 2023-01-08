const remove_tryCatch = require("../middlewares/remove_tryCatch");
const _ = require("lodash");
const Success = require("./response_objects/2xx");
const {create_entry, find_many } = require("../models/queries/books.queries");

module.exports = {
    post_books: remove_tryCatch(async (req, res) => {
        const book = await create_entry(req.body, req, res);
        res.status(201).send(Success[201](_.pick(book, ["_id","title", "author", "year_of_publication", "publisher", "genre", "summary"])));
    }),

    get_books: remove_tryCatch(async (req, res) => res.send(await find_many()))
}