const jwt = require('jsonwebtoken');

const createTokenUser = ({payload}) =>{
    const jsonWeb = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
    return jsonWeb
}


const verifiyToken = ({paylaod}) => jwt.verify(payload,process.env.JWT_SECRET)





const attachCookies = ({res,user}) => {
    const token = createTokenUser({payload:user})

    const OneDay = 1000 * 60 * 60 *24

    res.cookie('Token',token,{
     httpOnly:true,
     expires:new Date(Date.now() + OneDay),
     secure:process.env.NODE_ENV === "production",
     signed:true
    })
}



module.exports = {
    attachCookies,
    verifiyToken
}


