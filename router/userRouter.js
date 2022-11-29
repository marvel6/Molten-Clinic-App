const express = require('express')
const router = express.Router()


const {signupuser,login,logout} = require('../controller/user')


router.post('/signup',signupuser);
router.post('/login',login);
router.post('/logout',logout)


module.exports = router  