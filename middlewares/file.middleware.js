const path = require("path");
const config = require("config");

module.exports = {
    
    file_upload: function upload(req, res){
        if(!req.files) return res.status(400).send("No file uploaded."); 
        if(req.files.file.mimetype !== "application/pdf") return res.status(400).send("Please send pdf file.");
        const file = req.files.file;
        const file_name = file.name;
        const file_path = path.join(config.get("pdf_path"), `${Date.now() + file_name}`);
        file.mv(file_path, (err) => {
            if (err) return res.status(400).send(err);
        })
        return new Promise((resolve, reject) => {
            file.mv(file_path, (err) => {
                if(err) {
                    console.log(err);
                    return reject(err)
                }
                resolve(file_path);
            });
        })   
    }
}