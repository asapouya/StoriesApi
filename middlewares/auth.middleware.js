const jwt = require("jsonwebtoken");
const config = require("config");

const ClientError = require("../controllers/response_objects/4xx");
const clientErrorResponseObj = new ClientError();

module.exports = async (req, res, next) => {
    const token = req.header("X-auth-token");
    if(!token) return res.status(401).send(clientErrorResponseObj[401]());

    try {
        const decoded = jwt.verify(token, config.get("JWT_PRIVATE_KEY"));
        req.user = decoded;
        next();
    }catch(err) {
        res.status(401).send(clientErrorResponseObj[401]());
    }
}