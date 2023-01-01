const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (id, admin) => {
    return jwt.sign({_id: id, admin: admin}, config.get("JWT_PRIVATE_KEY"), {expiresIn: "7d"});
}