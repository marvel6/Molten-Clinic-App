const mongoose = require('mongoose')
const geocoder = require('../utils/geoCoder')

const addStoreSchema = new mongoose.Schema({
  FarmId: String,
  Address: {
    type: String,
    //required: [true, 'please provide an address']
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],

    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String,
    city: String,
    zipcode: String,
    streetNumber: String,
    createdAt: {
      type: Date,
      default: Date.now()
    },
    expiresAt: {
      type: Date,
    }
  },
  


})

addStoreSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.Address)


  this.location = {
    type: 'Point',
    coordinates: [loc[0].latitude, loc[0].longitude],
    formattedAddress: loc[0].formattedAddress,
    city: loc[0].city,
    zipcode: loc[0].zipcode,
    streetNumber: loc[0].streetNumber,
  }

  this.Address = undefined
  next()
})





module.exports = mongoose.model('AddStore', addStoreSchema)