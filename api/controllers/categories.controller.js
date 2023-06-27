const { Category } = require('../models')
const { showError } = require('../lib')
 
class CategoriesController {
    index = async (req, res, next) => {
        try {
            const categories = await Category.find()

            res.json(categories)
        } catch(err) {
            showError(err, next)
        }
    }
    
    store = async (req, res, next) => {
        try {
            const { name, status } = req.body

            await Category.create({
                name, status
            })

            res.status(201).json({
                success: 'Category created.'
            })
        } catch(err) {
            showError(err, next)
        }
    }
    
    show = async (req, res, next) => {
        try {
            const category = await Category.findById(req.params.id)

            res.json(category)
        } catch(err) {
            showError(err, next)
        }
    }
    
    update = async (req, res, next) => {
        try {
            const { name, status } = req.body

            await Category.findByIdAndUpdate(req.params.id, {
                name, status
            })

            res.json({
                success: 'Category updated.'
            })
        } catch (err) {
            showError(err, next)
        }
    }
    
    destroy = async (req, res, next) => {
        try {
            await Category.findByIdAndDelete(req.params.id)

            res.json({
                success: 'Category removed.'
            })
        } catch(err) {
            showError(err, next)
        }
    }
}

module.exports = new CategoriesController