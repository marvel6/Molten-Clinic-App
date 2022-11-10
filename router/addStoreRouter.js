const express = require('express')
const router = express.Router()


const {addStore,updateStore,removeStore,getAllStores} = require('../controller/Stores')


router.route('/').post(addStore).get(getAllStores)
router.route('/:id').patch(updateStore).delete(removeStore)


module.exports = router