const express = require('express')
const { FrontCtrl } = require('../../controllers')

const router = express.Router()

router.get('/categories', FrontCtrl.categories)
router.get('/articles', FrontCtrl.articles)
router.get('/category/:id', FrontCtrl.categoryById)
router.get('/article/:id', FrontCtrl.articleById)
router.post('/article/:id/comment', FrontCtrl.comment)

router.get('/image/:filename', (req, res, next) => {
    res.sendFile(`images/${req.params.filename}`, {root: './'})
})

module.exports = router