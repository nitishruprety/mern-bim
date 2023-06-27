const { Types } = require("mongoose")
const { showError } = require("../lib")
const { Category, Article, Comment } = require("../models")

class FrontController {

    categories = async (req, res, next) => {
        try {
            const categories = await Category.find({status: true})

            res.json(categories)
        } catch(err) {
            showError(err, next)
        }
    }

    articles = async (req, res, next) => {
        try {
            const articles = await Article.find({status: 'Published'})

            res.json(articles)
        } catch (err) {
            showError(err, next)
        }
    }

    categoryById = async (req, res, next) => {
        try {
            const category = await Category.aggregate([
                {$match: {status: true, _id: new Types.ObjectId(req.params.id)}},
                {$lookup: {from: 'articles', localField: '_id', foreignField: 'categoryId', as: 'articles'}}
            ]).exec()

            res.json(category.pop())
        } catch (err) {
            showError(err, next)
        }
    }
    
    articleById = async (req, res, next) => {
        try {
            const article = await Article.aggregate([
                { $match: {status: 'Published', _id: new Types.ObjectId(req.params.id)}},
                {$lookup: {from: 'comments', localField: '_id', foreignField: 'articleId', as: 'comments'}}
            ]).exec()

            res.json(article.pop())
        } catch (err) {
            showError(err, next)
        }
    }

    comment = async (req, res, next) => {
        try {
            const {name, email, comment} = req.body

            await Comment.create({name, email, comment, articleId: req.params.id})

            res.json({
                success: 'Thank you for your comment.'
            })
        } catch(err) {
            showError(err, next)
        }
    }

}

module.exports = new FrontController