const CategoryService = require('../services/CategoryService')

const createCategory = async (req, res) => {
    try {
        const { name, type } = req.body
        if (!name || !type) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Dữ liệu không hợp lệ'
            })
        }
        const response = await CategoryService.categoryService(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getAllCategoy = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await CategoryService.getAllCategoy(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        const data = req.body
        if (!categoryId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'id thể loại là bắt buộc'
            })
        }
        const response = await CategoryService.updateCategory(categoryId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsCategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        if (!categoryId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'id thể loại là bắt buộc'
            })
        }
        const response = await CategoryService.getDetailsCategory(categoryId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        if (!categoryId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Id là bắt buộc'
            })
        }
        const response = await CategoryService.deleteCategory(categoryId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Id là bắt buộc'
            })
        }
        const response = await CategoryService.deleteMany(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getCategoryByType = async (req, res) => {
    try {
        const { type } = req.query
        const response = await CategoryService.getCategoryByType(type)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createCategory,
    getAllCategoy,
    updateCategory,
    getDetailsCategory,
    deleteCategory,
    deleteMany,
    getCategoryByType,
}