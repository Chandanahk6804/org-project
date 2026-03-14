const express = require('express')

const validate = require('../modules/user/middleware/body-validation')
const {signupSchema, updateSchema, loginSchema} = require('../modules/user/validation/user-schema')

const getUsers = require('../modules/user/controller/get-users')
const getUser = require('../modules/user/controller/get-one-user')

const createUser = require('../modules/user/controller/create-user')
const login = require('../modules/user/controller/login')


const updateUser = require('../modules/user/controller/update-user')

const deleteUser = require('../modules/user/controller/delete-user')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

const router = express.Router()

router.get('/', authenticate, getUsers)
router.get('/:userId', authenticate, getUser)

router.post('/signup',  validate(signupSchema), createUser)
router.post('/login', validate(loginSchema), login)

router.patch('/:userId', authenticate, authorize, validate(updateSchema), updateUser)

router.delete('/:userId', authenticate, authorize, deleteUser)

module.exports = router