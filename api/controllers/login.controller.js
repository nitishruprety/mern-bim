const { showError } = require("../lib")
const { User } = require("../models")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class LoginController {

    check = async (req, res, next) => {
        try {
            const { email, password } = req.body

            const user = await User.findOne({email})

            if(user) {
                if(bcrypt.compareSync(password, user.password)) {
                    const token = jwt.sign({
                        id: user._id,
                        iat: Math.floor(Date.now()/1000),
                        exp: Math.floor(Date.now()/1000) + (30*24*60*60),
                    }, process.env.JWT_SECRET)

                    res.json({token, user})
                } else {
                    next({
                        message: 'Invalid password.',
                        status: 422,
                    })
                }
            } else {
                next({
                    message: 'Invalid email.',
                    status: 422,
                })
            }
        } catch(err) {
            showError(err, next)
        }
    }

}

module.exports = new LoginController