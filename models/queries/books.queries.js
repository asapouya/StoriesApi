const Books = require("../books.model");
const Queries = require("./queries");
const { validate_books } = require("../../validation/books.validation")
const {file_upload} = require("../../middlewares/file.middleware");

class Books_Queries extends Queries{
    
    static async create_entry(book_object, req, res){
        //await validate_books(book_object);
        const file_path = await file_upload(req, res);
        book_object.book_pdf_dir = file_path;
        return await super.create_entry(book_object, Books);
    }

    static async find_many(){
        return await super.find_many(Books, {book_pdf_dir: 0, __v: 0});
    }
}

module.exports = Books_Queries;