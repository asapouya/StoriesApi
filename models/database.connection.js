const mongoose = require("mongoose");
const config = require("config");

async function databaseConnect(){

    let dbConnection;

    try{
        await mongoose.connect(config.get("mongo_url"));

        if(process.env.NODE_ENV === "development") {

            dbConnection = "development";
            console.log(`connected to ${dbConnection} db.`);
        }else {

            dbConnection = "testing";
            console.log(`connected to ${dbConnection} db.`);
        }
    }catch(err){
        console.log(err);
    }

}

module.exports = databaseConnect;