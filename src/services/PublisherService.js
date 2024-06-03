const Publisher = require("../models/PublisherModel")

const publisherService = (newPublisher) => {
    return new Promise(async (resolve, reject) => {
        const { name, address, phone, email } = newPublisher
        try {
            const newPublisher = await Publisher.create({
                name, address, phone, email
            })
            if (newPublisher) {
                resolve({
                    status: 'OK',
                    message: 'Thành công',
                    data: newPublisher
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
const getAllPublisher = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalPublisher = await Publisher.count()
            let allPublisher = []
            if (filter) {
                const label = filter[0]
                const allObjectFilter = await Publisher.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit)
                resolve({
                    status: 'OK',
                    message: 'Hiển thị dữ liệu thành công',
                    data: allObjectFilter,
                    total: totalPublisher,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalPublisher / limit)
                })
            }
            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allPublisherSort = await Publisher.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status: 'OK',
                    message: 'Hiển thị dữ liệu thành công',
                    data: allPublisherSort,
                    total: totalPublisher,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalPublisher / limit)
                })
            }
            if (!limit) {
                allPublisher = await Publisher.find()
            } else {
                allPublisher = await Publisher.find().limit(limit).skip(page * limit)
            }
            resolve({
                status: 'OK',
                message: 'Hiển thị dữ liệu thành công',
                data: allPublisher,
                total: totalPublisher,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalPublisher / limit)
            })

        } catch (e) {
            reject(e)
        }
    })
}

const updatePublisher = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const check = await Publisher.findOne({
                _id: id
            })
            if (check === null) {
                resolve({
                    status: 'OK',
                    massge: 'Nhà xuất bản không tồn tại'
                })
            }

            const updatePublisher = await Publisher.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Thành công',
                data: updatePublisher
            })

        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsPublisher = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const publisher = await Publisher.findOne({
                _id: id
            })
            if (publisher === null) {
                resolve({
                    status: 'OK',
                    massge: 'Nhà xuất bản không tồn tại'
                })
            }
            resolve({
                status: 'OK',
                message: 'Thành công',
                data: publisher
            })

        } catch (e) {
            reject(e)
        }
    })
}

const deletePublisher = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const check = await Publisher.findOne({
                _id: id
            })
            if (check === null) {
                resolve({
                    status: 'OK',
                    massge: 'Nhà xuất bản không tồn tại'
                })
            }

            await Publisher.findByIdAndDelete(id)
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
            await Publisher.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Xóa dữ liệu thành công',
            })

        } catch (e) {
            reject(e)
        }
    })
}

const fetchPublishers = async (publishId) => {
    try {
        const publishers = await Publisher.find({ _id: { $in: publishId } })
        return {
            status: 'OK',
            message: 'Đã tìm thấy nhà xuất bản',
            publishers
        };
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error fetching publishId:', error);
        throw error;
    }
};

module.exports = {
    publisherService,
    getAllPublisher,
    updatePublisher,
    getDetailsPublisher,
    deletePublisher,
    deleteMany,
    fetchPublishers
}