const remove_tryCatch = require("../middlewares/remove_tryCatch");
const _ = require("lodash");
const Success = require("./response_objects/2xx");
const ClientError = require("./response_objects/4xx");
const {create_entry, find_many } = require("../models/queries/books.queries");

const {validate_comments} = require("../validation/books.comments.validation");
const Books = require("../models/books.model");

module.exports = {
    post_books: remove_tryCatch(async (req, res) => {
        const book = await create_entry(req.body, req, res);
        res.status(201).send(Success[201](_.pick(book, ["_id","title", "author", "year_of_publication", "publisher", "genre", "summary"])));
    }),

    get_books: remove_tryCatch(async (req, res) => res.send(await find_many())),

    post_comments: remove_tryCatch(async (req, res) => {
        let book_id = req.params.book_id;
        const mongoose = require("mongoose");
        const is_valid = mongoose.Types.ObjectId.isValid(book_id); //true
        if(!is_valid) res.status(400).send(ClientError[400]("Please provide valid book id"));
        const book = await Books.findById(book_id);
        if(!book) return res.status(404).send(ClientError[404]());
        await validate_comments(req.body);
        const comment = {
            commenter: req.user._id,
            comment: req.body.comment
        }
        await Books.updateOne({_id: book_id}, {$push: { comments: comment }});
        res.status(201).send(Success[201](comment));
    })
}