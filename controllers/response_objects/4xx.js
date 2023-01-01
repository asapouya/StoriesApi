class ClientError {
    
    404(obj) {
        return {
            state: "Not found",
            data: obj
        }
    }

    401() {
        return {
            state: "Forbidden",
            data: {
                message: "You don't have access to this endpoint"
            }
        }
    }
}

module.exports = ClientError;