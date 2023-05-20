const {CustomAPIError} = require('../errors')
const {StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err,req, res, next) => {
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg:err.msg})
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
}
module.exports = errorHandlerMiddleware;