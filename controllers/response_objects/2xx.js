class Success {
    
    static 201(obj) {
        return {
            state: "Created",
            data: obj
        }
    }
    static 200(message) {
        return {
            state: "Success",
            data: {
                message: message
            }
        }
    }
}

module.exports = Success;