class CustomApiError extends Error {
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
    }
}

const CreateCustomError = (msg, statusCode) => {
    return new CustomApiError(msg, statusCode);
}

module.exports = {
    CreateCustomError,
    CustomApiError,
};