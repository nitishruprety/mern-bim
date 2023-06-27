const express = require('express')
const { ArticleCtrl } = require('../../controllers')
const { uploadImage } = require('../../lib')

const router = express.Router()

router.route('/')
    .get(ArticleCtrl.index)
    .post(uploadImage().single('file'), ArticleCtrl.store)

router.route('/:id')
    .get(ArticleCtrl.show)
    .put(uploadImage().single('file'), ArticleCtrl.update)
    .patch(uploadImage().single('file'), ArticleCtrl.update)
    .delete(ArticleCtrl.destroy)

module.exports = router