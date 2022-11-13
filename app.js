require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const cors = require('cors')
const exp = require('express-rate-limit')
const helmet = require('helmet')

const morgan = require('morgan')


const connectDb = require('./db/connect')

const router = require('./router/addStoreRouter')


//middleware functions




app.use(express.json())
app.use(morgan("tiny"))

app.use(express.static('./public'))


app.use('/api/v1/auth/stores',router)


const start = async () =>{
    try {
        await connectDb("mongodb://0.0.0.0:27017/Clinic")
        app.listen(port,()=> console.log(`App listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}


start()


