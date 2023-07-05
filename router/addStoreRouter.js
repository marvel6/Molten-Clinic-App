const express = require('express')
const router = express.Router()


const {addStore,updateStore,removeStore,getAllStores} = require('../controller/Stores')


router.route('/').post(addStore).get(getAllStores)



module.exports = router