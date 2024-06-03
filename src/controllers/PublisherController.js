const PublisherService = require('../services/PublisherService')

const createPublisher = async (req, res) => {
    try {
        const { name, address, phone, email } = req.body
        if (!name || !address) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Dữ liệu không hợp lệ'
            })
        }
        const response = await PublisherService.publisherService(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getAllPublisher = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await PublisherService.getAllPublisher(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updatePublisher = async (req, res) => {
    try {
        const categoryId = req.params.id
        const data = req.body
        if (!categoryId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'id thể loại là bắt buộc'
            })
        }
        const response = await PublisherService.updatePublisher(categoryId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsPublisher = async (req, res) => {
    try {
        const categoryId = req.params.id
        if (!categoryId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'id thể loại là bắt buộc'
            })
        }
        const response = await PublisherService.getDetailsPublisher(categoryId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deletePublisher = async (req, res) => {
    try {
        const categoryId = req.params.id
        if (!categoryId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Id là bắt buộc'
            })
        }
        const response = await PublisherService.deletePublisher(categoryId)
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
        const response = await PublisherService.deleteMany(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const fetchPublishers = async (req, res) => {
    try {
        const publishId = req.query.publishId;
        if (!publishId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Thiếu hoặc sai định dạng publishId'
            });
        }

        // Gọi service để lấy đánh giá
        const response = await PublisherService.fetchPublishers(publishId);

        // Trả về kết quả từ service
        return res.status(200).json(response);
    } catch (error) {
        // Bắt lỗi và trả về thông báo lỗi cụ thể
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi lấy đánh giá: ' + error.message
        });
    }
};

module.exports = {
    createPublisher,
    getAllPublisher,
    updatePublisher,
    getDetailsPublisher,
    deletePublisher,
    deleteMany,
    fetchPublishers
}