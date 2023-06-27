const {Schema, model} = require('mongoose')

const Category = model('Category', new Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
}))

module.exports = Category