const {verifiyToken} = require('../utils/utils');
const {StatusCodes} = require('http-status-codes');
const customError = require('../error')



const tokenAuthentication = (req,res,next) =>{
    const token = req.signedCookies;   // using express cookies token

    if(!token){
      throw new customError.UnauthenticatedError('You are not authenticated to access this route')
    }

    try {
        const {name,userId,role} = verifiyToken({paylaod:token});
        req.user = {name,userId,role}      //assign token in req.user
        next()
        
    } catch (error) {
        throw new customError.NotFoundError('authentication invalid')
    }
};


const checkPermission = (...roles) =>{   // roles authentication
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
            throw new customError.UnauthorizedError('you are not authorized to access this route')
        }
        next()
    }
}



module.exports = {
    tokenAuthentication,
    checkPermission
}






