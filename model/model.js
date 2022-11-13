const mongoose = require('mongoose')
const geocoder = require('../utils/geoCoder')

const addStoreSchema = new mongoose.Schema({
    ClinicId:{
        type:String,
        required:[true,'please provide an Id'],
        trim:true,
        unique:true,
        maxlenght:[10,'please provide a number less than 10'],
    },
    Address:{
        type:String,
        required:[true,'please provide an address']
    },
    location: {
        type: {
          type: String,
          enum: ['Point'], 

        },
        coordinates: {
          type: [Number],
          index:'2dsphere'
        },
        formattedAddress:String,
        createdAt:{
            type:Date,
            default: Date.now()
        }
      }

})

addStoreSchema.pre('save',async function(next){
  const loc = await geocoder.geocode(this.Address)
 
   this.location = {
     type:'Point',
     coordinates:[loc[0].latitude,loc[0].longitude],
     formattedAddress:loc[0].formattedAddress
   }

   this.Address = undefined
   next()
})


module.exports = mongoose.model('AddStore',addStoreSchema)