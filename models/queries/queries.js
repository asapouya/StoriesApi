class Queries{
    static async create_entry(entry_object, DataBase_model){
        const data = new DataBase_model(entry_object);
        return await data.save(); 
    }
    static async find_many(DataBase_model, ...options){
        return await DataBase_model.find({}, ...options).collation({locale: "en_US", strength: 2});
    }
    static async find_one(search_value ,DataBase_model, ...options){
        return await DataBase_model.findOne(search_value, ...options).collation({locale: "en_US", strength: 2});
    }
}
module.exports = Queries;