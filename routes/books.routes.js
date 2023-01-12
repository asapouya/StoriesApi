const express = require("express"); 
const router = express.Router();
const { post_books, get_books, post_comments } = require("../controllers/books.controllers");

const auth = require("../middlewares/auth.middleware");
const auth_admin = require("../middlewares/auth.admin.middleware");

router.post("/", [auth, auth_admin] ,post_books);
router.get("/", get_books);
router.post("/:book_id/comments", auth ,post_comments);

module.exports = router;