const { User } = require('../models')
const { showError } = require('../lib')
const bcrypt = require('bcryptjs')
 
class UsersController {
    index = async (req, res, next) => {
        try {
            const users = await User.find()

            res.json(users)
        } catch(err) {
            showError(err, next)
        }
    }
    
    store = async (req, res, next) => {
        try {
            const { name, email, password, phone, address, status } = req.body

            const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

            await User.create({
                name, email, password: hash, phone, address, status
            })

            res.status(201).json({
                success: 'User created.'
            })
        } catch(err) {
            showError(err, next)
        }
    }
    
    show = async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id)

            res.json(user)
        } catch(err) {
            showError(err, next)
        }
    }
    
    update = async (req, res, next) => {
        try {
            const { name, phone, address, status } = req.body

            await User.findByIdAndUpdate(req.params.id, {
                name, phone, address, status
            })

            res.json({
                success: 'User updated.'
            })
        } catch (err) {
            showError(err, next)
        }
    }
    
    destroy = async (req, res, next) => {
        try {
            await User.findByIdAndDelete(req.params.id)

            res.json({
                success: 'User removed.'
            })
        } catch(err) {
            showError(err, next)
        }
    }
}

module.exports = new UsersController