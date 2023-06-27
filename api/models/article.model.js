const {Schema, model} = require('mongoose')

const Article = model('Article', new Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'categories'
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    image: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Draft', 'Published', 'Unpublished'],
        default: 'Draft',
    }
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
}))

module.exports = Article