const dotenv = require('dotenv').config()
const gropu_repo = require('../repository/group.repository')

module.exports = {
    create_group: async (req, res) => {
        try {
            const data = await gropu_repo.create_group(req.body)
            res.json({
                success: true,
                data,
                msg: 'Created Group Successfully',
            })
        } catch (error) {
            res.json({
                success: false,
                Error: error,
                msg: 'Failed to create group',
            })
        }
    },
    join_group: async (req, res) => {
        try {
            const data = await gropu_repo.join_group(req.body)
            res.json({
                success: true,
                data,
                msg: 'Joined Group Successfully',
            })
        } catch (error) {
            res.json({
                success: false,
                Error: error,
                msg: 'Failed to join group',
            })
        }
    },
    remove_user: async (req, res) => {
        try {
            const data = await gropu_repo.remove_user(req.body)
            res.json({
                success: true,
                data,
                msg: 'Removed User Successfully',
            })
        } catch (error) {
            res.json({
                success: false,
                Error: error,
                msg: 'Failed to remove user',
            })
        }
    }
}
