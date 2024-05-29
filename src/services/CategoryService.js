const Category = require("../models/CategoryModel")

const categoryService = (newCategory) => {
    return new Promise(async (resolve, reject) => {
        const { name, description, type } = newCategory
        try {
            const newCategory = await Category.create({
                name, description, type
            })
            if (newCategory) {
                resolve({
                    status: 'OK',
                    message: 'Thành công',
                    data: newCategory
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
const getAllCategoy = (limit, page, sort, filter) => { //limit(sản phẩm của 1 trang) lấy dữ liệu DB, skip ẩn dữ liệu DB(tính từ trên xuống) 
    return new Promise(async (resolve, reject) => {
        try {
            const totalCategory = await Category.count()
            let allCategory = []
            if (filter) {
                const label = filter[0]
                const allObjectFilter = await Category.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit)
                resolve({
                    status: 'OK',
                    message: 'Hiển thị dữ liệu thành công',
                    data: allObjectFilter,
                    total: totalCategory,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalCategory / limit)
                })
            }
            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allCategorySort = await Category.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status: 'OK',
                    message: 'Hiển thị dữ liệu thành công',
                    data: allCategorySort,
                    total: totalCategory,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalCategory / limit)
                })
            }
            if (!limit) {
                allCategory = await Category.find()
            } else {
                allCategory = await Category.find().limit(limit).skip(page * limit)
            }
            resolve({
                status: 'OK',
                message: 'Hiển thị dữ liệu thành công',
                data: allCategory,
                total: totalCategory,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalCategory / limit)
            })

        } catch (e) {
            reject(e)
        }
    })
}

const updateCategory = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const check = await Category.findOne({
                _id: id
            })
            if (check === null) {
                resolve({
                    status: 'OK',
                    massge: 'Thể loại không tồn tại'
                })
            }

            const updateCategory = await Category.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Thành công',
                data: updateCategory
            })

        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const category = await Category.findOne({
                _id: id
            })
            if (category === null) {
                resolve({
                    status: 'OK',
                    massge: 'Thể loại không tồn tại'
                })
            }
            resolve({
                status: 'OK',
                message: 'Thành công',
                data: category
            })

        } catch (e) {
            reject(e)
        }
    })
}

const deleteCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const check = await Category.findOne({
                _id: id
            })
            if (check === null) {
                resolve({
                    status: 'OK',
                    massge: 'thể loại không tồn tại'
                })
            }

            await Category.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Xóa dữ liệu thành công',
            })

        } catch (e) {
            reject(e)
        }
    })
}

const deleteMany = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Category.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Xóa dữ liệu thành công',
            })

        } catch (e) {
            reject(e)
        }
    })
}

const getCategoryByType = async (type) => {
    try {
        const categoryByType = await Category.find({ type: type });

        return {
            status: 'OK',
            message: 'Hiển thị dữ liệu thành công',
            data: categoryByType
        };
    } catch (error) {
        return {
            status: 'Error',
            message: 'Không thể lấy dữ liệu',
            error: error.message
        };
    }
};

module.exports = {
    categoryService,
    getAllCategoy,
    updateCategory,
    getDetailsCategory,
    deleteCategory,
    deleteMany,
    getCategoryByType
}