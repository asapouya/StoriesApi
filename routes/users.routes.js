const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const auth_admin = require("../middlewares/auth.admin.middleware");

const { post_users, get_users } = require("../controllers/users.controller");

router.post("/", post_users);
router.get("/", [auth, auth_admin] ,get_users);

module.exports = router;