const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (id) => {
    return jwt.sign({_id: id}, config.get("JWT_PRIVATE_KEY"), {expiresIn: "7d"});
}
