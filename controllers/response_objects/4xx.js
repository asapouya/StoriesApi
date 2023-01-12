class ClientError {
    
    static 404(obj) {
        return {
            state: "Not found",
            data: obj
        }
    }

    static 401() {
        return {
            state: "Unauthorized",
            data: {
                message: "You don't have access to this endpoint"
            }
        }
    }

    static 400(message){
        return {
            state: "Bad request",
            data: {
                message: message
            }
        }
    }
}

module.exports = ClientError;