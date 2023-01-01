const express = require("express");
const router = express.Router();
const { post_auth } = require("../controllers/auth.controller");

router.post("/", post_auth);

module.exports = router;