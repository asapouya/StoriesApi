const verifier = require("email-verify");

module.exports = async (email) => {

    return new Promise((resolve, reject) => {

        verifier.verify(email, (err, info) => {
            if (err) return reject(err)
            resolve(info);
        })
    })
}