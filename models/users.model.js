const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");


const users_schema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        min: 2,
        max: 32
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    stories: {
        type: [Schema.Types.ObjectId],
        ref: "stories",
        default: []
    }
})

users_schema.methods = async function hash(){
    return await bcrypt.hash(this.password, 10);
}

const Users = model("users", users_schema);
module.exports = Users;