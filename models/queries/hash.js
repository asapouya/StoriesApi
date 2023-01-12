const bcrypt = require("bcrypt");

class Hash{
    static async hash(raw_text){
        return await bcrypt.hash(raw_text, 10);
    }
    static async compare(raw_text, hashed_value){
        return await bcrypt.compare(raw_text, hashed_value);
    }
}

module.exports = Hash;




