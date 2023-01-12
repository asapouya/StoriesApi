const { Schema, model } = require("mongoose");

const comments_schema = new Schema({
    commenter: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    comment: {
        type: String,
        required: true,
        max: 4096
    }
})

const books_schema = new Schema({
    
    author: {
        type: String,
        required: true,
        max: 256
    },
    title: {
        type: String,
        required: true,
        max: 124
    },
    year_of_publication: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true,
        max: 128
    },
    genre: {
        type: [String],
        required: true
    },
    summary: {
        type: String,
        required: true,
        max: 4096
    },

    book_pdf_dir: {
        type: String
    },

    comments: {
        type: [comments_schema]
    }
})

const Books = model("books", books_schema);

module.exports = Books;