require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const cors = require('cors')
const exp = require('express-rate-limit')
const helmet = require('helmet')

const morgan = require('morgan')

//middlewares

const cookies = require('cookie-parser')

const router = require('./router/addStoreRouter')
const userRoute = require('./router/userRouter')




const connectDb = require('./db/connect')





app.use(express.json())
app.use(morgan("tiny"))
app.use(cookies(process.env.JWT_SECRET))


//middleware functions


app.use(express.static('./public'))

//Route
app.use('/api/v1/auth/stores', router)
app.use('/api/v1/auth/stores', userRoute)


// process.env.MONGO_URI

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI)

    } catch (error) {
        console.log(error)
    }
}


start().then(() => {

    app.listen(port, () => console.log(`App listening on port ${port}`))

})


