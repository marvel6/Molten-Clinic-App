const {StatusCodes} = require('http-status-codes')
const User = require('../model/user')
const customError = require('../error')
const response = require('../response/response')
const {userInformation,attachCookies} = require('../utils/utils')

const signupuser = async(req,res) =>{          //user signup
    const {name , password , email} = req.body

    if(!name || !password || !email){
      throw new customError.BadRequestError('please provide valid credentials')
    }
    const userEmailVer = await User.findOne({email})

    if(userEmailVer){
        throw new customError.BadRequestError('please use anothee Email this Already exist')
    }

     const firstAccount = await User.countDocuments({}) === 0    // verifying user ? admin / user
     const role = firstAccount ? "admin":"user"

    const user = await User.create({name,password,email,role});

     const token =  userInformation(user)

     attachCookies({res,user:token})   //cookies

   
    res.status(StatusCodes.CREATED).send(response({msg:`Welcome ${name}`,data:token}))   
    
}



const login = async(req,res) =>{

  const {email,password} = req.body

  const user = await User.findOne({email})

  if(!user){
     res.status(StatusCodes.BAD_REQUEST).send(response({msg:'User not registered, please signup'}))
  }

  const isPasswordValid = await user.compares(password);  //bcryptjs

  if(!isPasswordValid){
     res.status(StatusCodes.BAD_REQUEST).send(response({msg:'please provide valid password or email'}))
  }

  const tokenUser = userInformation(user);

  attachCookies({res,user:tokenUser})

  res.status(StatusCodes.OK).send(response({msg:'logged In'}))


}

//destroy token
const logout = async(req,res) =>{

    res.cookie('Token','logout',{
        httpOnly:true,
        expires:new Date(Date.now())
       
    })
   
    res.status(StatusCodes.OK).send(response({msg:`you are logged out`}))
}





module.exports = { signupuser,login,logout}