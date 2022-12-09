const mongoose = require("mongoose");

async function databaseConnect(){

    try{
        await mongoose.connect("mongodb+srv://asapouya:Gozgoz1234@storiescluster.euhfaq8.mongodb.net/?retryWrites=true&w=majority");
        console.log("connected to database.");
    }catch(err){
        console.log(err);
    }

}

module.exports = databaseConnect;