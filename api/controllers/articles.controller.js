const { Article } = require('../models')
const { showError } = require('../lib')
const { unlinkSync } = require('node:fs')
 
class ArticlesController {
    index = async (req, res, next) => {
        try {
            const articles = await Article.aggregate([
                {$lookup: {from: 'categories', localField: 'categoryId', foreignField: '_id', as: 'category'}},
                {$lookup: {from: 'users', localField: 'userId', foreignField: '_id', as: 'user'}},
            ]).exec()

            res.json(articles)
        } catch(err) {
            showError(err, next)
        }
    }
    
    store = async (req, res, next) => {
        try {
            const { name, status, content, categoryId } = req.body

            const image = req.file ? req.file.filename : ''

            await Article.create({
                name, status, content, categoryId, userId: req.user._id, image
            })

            res.status(201).json({
                success: 'Article created.'
            })
        } catch(err) {
            showError(err, next)
        }
    }
    
    show = async (req, res, next) => {
        try {
            const article = await Article.findById(req.params.id)

            res.json(article)
        } catch(err) {
            showError(err, next)
        }
    }
    
    update = async (req, res, next) => {
        try {
            const { name, status, content, categoryId } = req.body

            const article = await Article.findById(req.params.id)

            let image

            if(req.file) {
                image = req.file.filename

                if(article.image.length) {
                    unlinkSync(`images/${article.image}`)
                }
            } else {
                image = article.image
            }

            await Article.findByIdAndUpdate(req.params.id, {
                name, status, content, categoryId, userId: req.user._id, image
            })

            res.json({
                success: 'Article updated.'
            })
        } catch (err) {
            showError(err, next)
        }
    }
    
    destroy = async (req, res, next) => {
        try {
            const article = await Article.findById(req.params.id)

            if (article.image.length) {
                unlinkSync(`images/${article.image}`)
            }

            await Article.findByIdAndDelete(req.params.id)

            res.json({
                success: 'Article removed.'
            })
        } catch(err) {
            showError(err, next)
        }
    }
}

module.exports = new ArticlesController