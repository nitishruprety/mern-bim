const jwt = require('jsonwebtoken')
const { User } = require('../models')
const multer = require('multer')

const showError = (error, next) => {
    console.error(error)

    next({
        message: 'Problem while processing request.',
        status: 400
    })
}

const auth = async (req, res, next) => {
    if('authorization' in req.headers) {
        const token = req.headers.authorization.split(" ").pop()

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)

            const user = await User.findById(payload.id)

            if(user) {
                if(user.status) {
                    req.user = user
                    next()
                } else {
                    next({
                        message: 'Inactive user.',
                        status: 403
                    })
                }
            } else {
                next({
                    message: 'Invalid token.',
                    status: 401
                })
            }
        } catch(err) {
            next({
                message: 'Invalid token.',
                status: 401
            })
        }
    } else {
        next({
            message: 'Token missing.',
            status: 401
        })
    }
}

const uploadImage = () => multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, 'images/'),
        filename: (req, file, cb) => {
            const ext = file.originalname.split('.').pop()

            cb(null, `img${Date.now()}.${ext}`)
        }
    })
})

module.exports = { showError, auth, uploadImage }