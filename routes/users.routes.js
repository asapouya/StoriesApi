const express = require("express");
const router = express.Router();

const { post_users, get_users } = require("../controllers/users.controller");

router.post("/", post_users);
router.get("/", get_users);

module.exports = router;