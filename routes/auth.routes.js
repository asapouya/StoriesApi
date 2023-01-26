const express = require("express");
const router = express.Router();
const { post_auth, get_confirmation } = require("../controllers/auth.controller");

router.post("/", post_auth);
router.get("/confirmation/:token", get_confirmation)

module.exports = router;