const customError = require('../error')
const {StatusCodes} = require('http-status-codes')
const Store = require('../model/model')


const getAllStores = async(req,res) =>{
    const stores = await Store.find()
     res.status(StatusCodes.OK).json({
       success:true,
       count:stores.length,
       data:stores
     })
  }

const addStore = async(req,res) =>{
   const {ClinicId,Address} = req.body

   if(!ClinicId || !Address){
     throw new customError.BadRequestError('please provide valid credentials')
   }

   const stores = await Store.create(req.body)

   res.status(StatusCodes.OK).json({
     success:true,
     data:stores
   })
}

const updateStore = async(req,res) =>{
   res.send('update store details')
}


const removeStore = async(req,res) =>{
  res.send('remove store details')
} 


module.exports = {
    addStore,
    updateStore,
    removeStore,
    getAllStores
}