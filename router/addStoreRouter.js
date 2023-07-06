const express = require('express')
const router = express.Router()


const { addStore, updateStore, removeStore, getAllStores, getDriversLocation } = require('../controller/Stores')


router.route('/').post(addStore).get(getAllStores)

router.route('/drivers').get(getDriversLocation)



module.exports = router