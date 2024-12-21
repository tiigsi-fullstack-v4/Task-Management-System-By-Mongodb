const { CustomApiError } = require("../Errors/custom-error");
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomApiError) {
        return res.status(err.statusCode).json({ error: err.message });
    }
    res.status(500).json({ error:"Something went wrong"});
}

module.exports = errorHandlerMiddleware;