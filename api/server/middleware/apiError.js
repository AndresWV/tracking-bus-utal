class apiError {
    constructor(code,message){
        this.code=code;
        this.message=message;
    }

    static duplicateImei(msg){
        return new apiError(409,msg);
    }
    static internal(msg){
        return new apiError(500,msg);
    }
}
module.exports = apiError;