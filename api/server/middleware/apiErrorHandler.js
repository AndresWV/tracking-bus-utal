const apiError = require('./apiError');

function apiErrorHandler(err, req, res, next){
    console.error(err);
    if(err instanceof apiError){
        res.status(err.code).send({error: err.message});
    } else {
        next(err);
    }
}

module.exports = apiErrorHandler;