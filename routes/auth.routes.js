const express = require("express");
const router = express.Router();
const { post_auth, update_confirmation } = require("../controllers/auth.controller");

router.post("/", post_auth);
router.put("/confirmation/:token", update_confirmation);

module.exports = router;