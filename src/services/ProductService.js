const Product = require("../models/ProductModel")

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { productCode, name, author, publishId, publishYear, episode, images, countInStock, categoryIds, price, description, discount } = newProduct
        try {
            const checkProduct = await Product.findOne({
                productCode: productCode
            })
            if (checkProduct !== null) {
                resolve({
                    //status: 'OK',
                    err: 1,
                    massge: 'Sản phẩm đã tồn tại'
                })
            }
            const newProduct = await Product.create({
                productCode, name, author,
                publishId,
                publishYear: Number(publishYear),
                episode,
                images, categoryIds, countInStock: Number(countInStock),
                price, description, discount: Number(discount)
            })
            if (newProduct) {
                resolve({
                    status: 'OK',
                    message: 'Thành công',
                    data: newProduct
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    massge: 'Sản phẩm không tồn tại'
                })
            }

            const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Thành công',
                data: updateProduct
            })

        } catch (e) {
            reject(e)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    massge: 'Sản phẩm không tồn tại'
                })
            }

            await Product.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Xóa dữ liệu thành công',
            })

        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Xóa dữ liệu thành công',
            })

        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            if (product === null) {
                resolve({
                    status: 'OK',
                    massge: 'Sản phẩm không tồn tại'
                })
            }
            resolve({
                status: 'OK',
                message: 'Thành công',
                data: product
            })

        } catch (e) {
            reject(e)
        }
    })
}

const getAllProduct = (limit, page, sort, filter) => { //limit(sản phẩm của 1 trang) lấy dữ liệu DB, skip ẩn dữ liệu DB(tính từ trên xuống) 
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.count()
            let allProduct = []
            if (filter) {
                const label = filter[0]
                const searchValue = filter[1];
                const regexFilter = { [label]: { '$regex': searchValue, '$options': 'i' } };
                const allObjectFilter = await Product.find(regexFilter).limit(limit).skip(page * limit)
                resolve({
                    status: 'OK',
                    message: 'Hiển thị dữ liệu thành công',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status: 'OK',
                    message: 'Hiển thị dữ liệu thành công',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if (!limit) {
                allProduct = await Product.find()
            } else {
                allProduct = await Product.find().limit(limit).skip(page * limit)
            }
            //const allProduct = await Product.find().skip(2) //Ẩn 2 dữ liệu đầu trong DB
            //const allProduct = await Product.find().limit(limit) //Lấy 2 dữ liệu DB bất kì
            resolve({
                status: 'OK',
                message: 'Hiển thị dữ liệu thành công',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            })

        } catch (e) {
            reject(e)
        }
    })
}

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type')
            resolve({
                status: 'OK',
                message: 'Hiển thị dữ liệu thành công',
                data: allType,
            })

        } catch (e) {
            reject(e)
        }
    })
}

const getAllProductsByCategoryIds = (limit, page, categoryIds) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments({ categoryIds: { $all: categoryIds } });
            const products = await Product.find({ categoryIds: { $all: categoryIds } })
                .limit(limit)
                .skip(page * limit)
                .exec();

            resolve({
                status: 'OK',
                message: 'Hiển thị dữ liệu thành công',
                data: products,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            });
        } catch (error) {
            reject(error);
        }
    });
};


module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteManyProduct,
    getAllType,
    getAllProductsByCategoryIds,
}