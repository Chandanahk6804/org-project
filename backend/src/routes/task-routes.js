const express = require('express')

const authenticate = require('../middleware/authenticate')

const validate = require('../modules/task/middleware/body-validation')
const baseSchema = require('../modules/task/validation/task-schema')

const createTask = require('../modules/task/controller/create-task')
const assignTask = require('../modules/task/controller/assign-task')
const getTasks = require('../modules/task/controller/get-task')

const router = express.Router()

router.get('/', authenticate, getTasks)

router.post('/:orgId', authenticate, validate(baseSchema), createTask)

router.patch('/:orgId/task/:taskId', authenticate, assignTask)

module.exports = router