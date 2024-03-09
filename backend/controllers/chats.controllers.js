const chat_repo = require('../repository/chat.repository')

module.exports = {
    get_my_chats: async (req, res) => {
        try {
            res.json({
                success: true,
                data,
                msg: 'Chats Fetched Successfully',
            })
        } catch (error) {
            res.json({
                success: false,
                Error: error,
                msg: 'Failed to fetch chats',
            })
        }
    }
}