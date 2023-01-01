const express = require("express"); 
const router = express.Router();
const { post_books } = require("../controllers/books.controllers");

const auth = require("../middlewares/auth.middleware");
const auth_admin = require("../middlewares/auth.admin.middleware");
// const upload = require("../middleware/file.middleware");

router.post("/", [auth, auth_admin] ,post_books);


module.exports = router;