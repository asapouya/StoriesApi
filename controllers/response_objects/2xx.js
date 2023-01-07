class Success {
    
    static 201(obj) {
        return {
            state: "Created",
            data: obj
        }
    }
}

module.exports = Success;