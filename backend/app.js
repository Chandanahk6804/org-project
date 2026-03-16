const express = require('express')
require('dotenv/config')

const errorHandler = require('./src/middleware/error-handler')

const userRouter = require('./src/routes/user-routes')
const orgRouter = require('./src/routes/org-routes')
const taskRouter = require('./src/routes/task-routes')

const app = express()

app.use(express.json())

app.use('/users', userRouter)
app.use('/orgs', orgRouter)
app.use('/tasks', taskRouter)

app.use(errorHandler)

app.listen(
    process.env.PORT, 
    () => console.log(`Server running on port ${process.env.PORT}`
))