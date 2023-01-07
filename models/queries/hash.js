const bcrypt = require("bcrypt");

class Hash{
    static async hash(raw_text){
        return await bcrypt.hash(raw_text, 10);
    }
}

module.exports = Hash;




