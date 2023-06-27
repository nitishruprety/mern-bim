const express = require('express')
const { CategoryCtrl } = require('../../controllers')

const router = express.Router()

router.route('/')
    .get(CategoryCtrl.index)
    .post(CategoryCtrl.store)

router.route('/:id')
    .get(CategoryCtrl.show)
    .put(CategoryCtrl.update)
    .patch(CategoryCtrl.update)
    .delete(CategoryCtrl.destroy)

module.exports = router