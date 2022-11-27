const customError = require('../error')
const {StatusCodes} = require('http-status-codes')
const Store = require('../model/model')
const response = require('../response/response')


const getAllStores = async(req,res) =>{
    const stores = await Store.find()

    if(!stores){
      throw new customError.NotFoundError('Store not found!')
    }

     res.status(StatusCodes.CREATED).send(response({data:stores,msg:'Stores Around you!'}))
  }

const addStore = async(req,res) =>{
   const {ClinicId,Address} = req.body

   if(!ClinicId || !Address){
     throw new customError.BadRequestError('please provide valid credentials')
   }

   const stores = await Store.create(req.body)

   res.status(StatusCodes.OK).send(response({data:stores,msg:'Store Added!'}))
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

   res.status(StatusCodes.OK).send(response({msg:'Store information Updated'}))
}


const removeStore = async(req,res) =>{
  const {id:clinicId} = req.params

  const removeClinic = await Store.findOneAndDelete({_id:clinicId})

  if(!removeClinic){
    throw new customError.NotFoundError('No records found')
  }

  await removeClinic.remove()

  res.status(StatusCodes.OK).send('Store Information removed')
} 


module.exports = {
    addStore,
    updateStore,
    removeStore,
    getAllStores
}