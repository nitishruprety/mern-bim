const express = require('express')
const userRoutes = require('./user.routes')
const categoryRoutes = require('./category.routes')
const articleRoutes = require('./article.routes')

const router = express.Router()

router.use('/users', userRoutes)
router.use('/categories', categoryRoutes)
router.use('/articles', articleRoutes)

module.exports = router