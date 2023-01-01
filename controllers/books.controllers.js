const remove_tryCatch = require("../middlewares/remove_tryCatch");
const { validate_books } = require("../validation/books.validation");
const Books = require("../models/books.model");
const _ = require("lodash");
const Success = require("./response_objects/2xx");
const successResponseObj = new Success(); 

const { file_upload } = require("../middlewares/file.middleware");

module.exports = {
    post_books: remove_tryCatch(async (req, res) => {
        await validate_books(req.body);
        const response_obj = _.pick(req.body, [
            "author", 
            "title", 
            "year_of_publication", 
            "publisher", 
            "genre", 
            "summary"
        ]);
        const book_obj = response_obj;
        const book_path = await file_upload(req, res);
        book_obj.book_pdf_dir = book_path;
        const book = new Books(book_obj);
        await book.save();
        res.status(201).send(successResponseObj[201](response_obj));
    })
}