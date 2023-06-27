const express = require('express')
const cmsRoutes = require('./cms')
const frontRoutes = require('./front')
const { LoginCtrl } = require('../controllers')
const { auth } = require('../lib')

const router = express.Router()

router.use('/cms', auth, cmsRoutes)
router.post('/login', LoginCtrl.check)
router.use(frontRoutes)

module.exports = router