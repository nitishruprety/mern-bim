const express = require('express')
const { UserCtrl } = require('../../controllers')

const router = express.Router()

router.route('/')
    .get(UserCtrl.index)
    .post(UserCtrl.store)

router.route('/:id')
    .get(UserCtrl.show)
    .put(UserCtrl.update)
    .patch(UserCtrl.update)
    .delete(UserCtrl.destroy)

module.exports = router