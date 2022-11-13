const NodeGeocoder = require('node-geocoder');

const options = {
  provider: process.env.GEOCODE_PROVIDER,
  httpAdapter:'https',
  apiKey: process.env.GEO_SECRET_KEY, 
  formatter: null 
};

const geocoder = NodeGeocoder(options);


module.exports = geocoder