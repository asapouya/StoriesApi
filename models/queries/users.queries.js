const Users = require("../users.model");
const Queries = require("./queries");
const {validate_users} = require("../../validation/users.validation");
const {hash} = require("./hash");

class Users_queries extends Queries{

    static async create_entry(user_object){
        await validate_users(user_object);
        user_object.password = await hash(user_object.password);
        return await super.create_entry(user_object, Users);
    }

    static async find_many(){
        return await super.find_many(Users, {password: 0, __v: 0});
    }
}
module.exports = Users_queries;


