const express = require('express')

const authenticate = require('../middleware/authenticate')

const validate = require('../modules/organisation/middleware/body-validation')
const baseSchema = require('../modules/organisation/validation/org-schema')

const createOrg = require('../modules/organisation/controller/create-org')
const getOrgs = require('../modules/organisation/controller/get-orgs')
const addUser = require('../modules/organisation/controller/add-user')


const router = express.Router()

router.get('/', authenticate, getOrgs)

router.post('/', authenticate, validate(baseSchema), createOrg)
router.post('/:orgId/users', authenticate, addUser)

module.exports = router