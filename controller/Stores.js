const customError = require('../error')
const { StatusCodes } = require('http-status-codes')
const Store = require('../model/model')
const response = require('../response/response')
const NodeGeocoder = require('node-geocoder');

const getAllStores = async (req, res) => {
    const stores = await Store.find()

    if (!stores) {
        throw new customError.NotFoundError('Store not found!')
    }

    res.status(StatusCodes.CREATED).send(response({ data: stores, msg: 'Stores Around you!' }))
}

const addStore = async (req, res) => {
    const { Address } = req.body;
  
  

    const options = {
      provider: process.env.GEOCODE_PROVIDER,
      httpAdapter:'https',
      apiKey: process.env.GEO_SECRET_KEY, 
      formatter: null 
    };
    
    const geocoder = NodeGeocoder(options);

    const addr = await geocoder.geocode(Address)

    const Data = {
      formattedAddress: addr[0].formattedAddress,
      latitude: addr[0].latitude,
      longitude: addr[0].longitude,
      country: addr[0].country,
      city: addr[0].city,
      stateCode:addr[0].stateCode,
      zipcode:addr[0].zipcode,
      streetName:addr[0].streetName,
      streetNumber: addr[0].streetName,
      countryCode: addr[0].countryCode,
      provider: null
    }
  
    res.status(StatusCodes.CREATED).send(response({ data: Data, msg: 'location' }));
  }  

const updateStore = async (req, res) => {
    
   
}


const removeStore = async (req, res) => {
   
}


module.exports = {
    addStore,
    updateStore,
    removeStore,
    getAllStores
}