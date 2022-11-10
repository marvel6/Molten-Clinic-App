const mongoose = require('mongoose')


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


module.exports = mongoose.model('AddStore',addStoreSchema)