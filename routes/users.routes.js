const express = require("express");
const router = express.Router();

const { post_users } = require("../controllers/users.controller");

router.post("/", post_users);

module.exports = router;