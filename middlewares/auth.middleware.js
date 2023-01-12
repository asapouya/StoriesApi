const ClientError = require("../controllers/response_objects/4xx");
const {verify_token} = require("../auth/jwt");

module.exports = async (req, res, next) => {
    const token = req.header("X-auth-token");
    if(!token) return res.status(401).send(ClientError[401]());

    try {
        const decoded = verify_token(token);
        req.user = decoded;
        next();
    }catch(err) {
        res.status(401).send(ClientError[401]());
    }
}