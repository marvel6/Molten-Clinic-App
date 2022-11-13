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
   const {id:clinicId} = req.params
   const {ClinicId,Address} = req.body
   
   const verifyClinic = await Store.findOne({_id:clinicId})

   if(!verifyClinic){
     throw new customError.NotFoundError(`There is no store with Id ${clinicId}`)
   }

   verifyClinic.ClinicId = ClinicId
   verifyClinic.Address = Address

   await verifyClinic.save()

   res.status(StatusCodes.OK).json({msg:'Store Successfully updated'})
}


const removeStore = async(req,res) =>{
  const {id:clinicId} = req.params

  const removeClinic = await Store.findOneAndDelete({_id:clinicId})

  if(!removeClinic){
    throw new customError.NotFoundError('No records found')
  }

  await removeClinic.remove()

  res.status(StatusCodes.OK).json({msg:'Clinic removed Successfully'})
} 


module.exports = {
    addStore,
    updateStore,
    removeStore,
    getAllStores
}