const {Schema, model} = require('mongoose')

const Comment = model('Comment', new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    articleId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'articles'
    },
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
}))

module.exports = Comment