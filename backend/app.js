const express = require('express')
const errorHandler = require('./src/middleware/error-handler')
require('dotenv/config')

const userRouter = require('./src/routes/user-routes')

const app = express()

app.use(express.json())

app.use('/users', userRouter)

app.use(errorHandler)

app.listen(
    process.env.PORT, 
    () => console.log(`Server running on port ${process.env.PORT}`
))