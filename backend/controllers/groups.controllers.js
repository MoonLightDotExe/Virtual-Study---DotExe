const dotenv = require('dotenv').config()
const gropu_repo = require('../repository/group.repository')
const features = require('../config/features.js')
const events = require('../constants/events.js')

module.exports = {
    create_group: async (req, res) => {
        try {
            const data = await gropu_repo.create_group(req.body)
            res.json({
                success: true,
                data,
                msg: 'Created Group Successfully',
            })
            features.emitEvent(req, events.ALERT, data.members, `Welcome to ${data.name} Group Chat`)
            //emitEvent(req, events.REFETCH_CHATS, user_id) //Not needed
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
    },
    get_my_groups: async (req, res) => {
        try {
            const data = await gropu_repo.get_my_groups(req.body)
            res.json({
                success: true,
                data,
                msg: 'Groups Fetched Successfully',
            })
        } catch (error) {
            res.json({
                success: false,
                Error: error,
                msg: 'Failed to fetch groups',
            })
        }
    },
    send_attachment: async (req, res) => {
        try {
            const data = await gropu_repo.send_attachment(req.body, req.file)
            // features.emitEvent(req, events.NEW_ATTACHMENT, data.members, {
            //     message: data.messageForRealTime,
            //     group_id: req.body.group_id
            // })
            //features.emitEvent(req, events.NEW_MESSAGE_ALERT, data.members, { group_id: req.body.group_id })
            res.json({
                success: true,
                data,
                msg: 'Attachment Sent Successfully',
            })
        } catch (error) {
            res.json({
                success: false,
                Error: error,
                msg: 'Failed to send attachment',
            })
        }
    },
    get_group_messages: async (req, res) => {
        try {
            const data = await gropu_repo.get_group_messages(req.body)
            res.json({
                success: true,
                data,
                msg: 'Messages Retreived Successfully',
            })
        } catch (error) {
            res.json({
                success: false,
                Error: error,
                msg: 'Failed to retreive messages',
            })
        }
    }
}
