const express = require('express')
const getAllUsers = require('../modules/user/controller/get-users')
const addUser = require('../modules/user/controller/add-user')
const validate = require('../modules/user/middleware/body-validation')
const signupSchema = require('../modules/user/validation/user-schema')

const router = express.Router()

router.get('/get-users', getAllUsers)

router.post('/signup', validate(signupSchema), addUser)

module.exports = router