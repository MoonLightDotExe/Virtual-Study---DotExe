const dotenv = require('dotenv').config()
const groups = require('../models/groups.models.js')
const users = require('../models/users.models.js')

const self = (module.exports = {
    create_group: (body) => {
        console.log(body)
        return new Promise(async (resolve, reject) => {
            try {
                const { name, user_id } = body
                if (!name || !user_id) {
                    reject({
                        status: 400,
                        message: 'Missing Data!',
                    })
                }
                else {
                    const userExists = await users.findOne({ _id: user_id })
                    if (!userExists) {
                        reject({
                            status: 404,
                            message: 'User not found',
                        })
                    }
                    else {
                        const new_group = await groups.create({
                            name,
                            admin: [user_id],
                            members: [user_id]
                        })

                        userExists.groups.push(new_group._id)
                        await userExists.save()

                        resolve({
                            id: new_group._id,
                            name,
                            admin: new_group.admin,
                            members: new_group.members
                        })
                    }
                }
            } catch (error) {
                reject(error)
            }
        })
    },
    join_group: (body) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { user_id, group_id } = body
                if (!group_id || !user_id) {
                    reject({
                        status: 400,
                        message: 'Missing Data!',
                    })
                }
                else {
                    const groupExists = await groups.findOne({ _id: group_id })
                    if (!groupExists) {
                        reject({
                            status: 404,
                            message: 'Group not found',
                        })
                    }
                    else if (groupExists.members.includes(user_id)) {
                        reject({
                            status: 400,
                            message: 'user already in this group',
                        })
                    }
                    else {
                        const userExists = await users.findOne({ _id: user_id })
                        if (!userExists) {
                            reject({
                                status: 404,
                                message: 'User not found',
                            })
                        }
                        else {
                            groupExists.members.push(user_id)
                            await groupExists.save()

                            userExists.groups.push(group_id)
                            await userExists.save()

                            resolve({
                                id: groupExists._id,
                                name: groupExists.name,
                                admin: groupExists.admin,
                                members: groupExists.members
                            })
                        }
                    }
                }
            } catch (error) {
                reject(error)
            }
        })
    },
    remove_user: (body) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { group_id, remove_id, user_id } = body
                if (!user_id || !remove_id) {
                    reject({
                        status: 400,
                        message: 'Missing Data!',
                    })
                }
                else {
                    const groupExists = await groups.findOne({ _id: group_id })
                    if (!groupExists) {
                        reject({
                            status: 404,
                            message: 'Group not found',
                        })
                    }
                    else if (!groupExists.admin.includes(user_id)) {
                        reject({
                            status: 401,
                            message: 'You are not group admin',
                        })
                    }
                    else {
                        const userExists = await users.findOne({ _id: user_id })
                        if (!userExists) {
                            reject({
                                status: 404,
                                message: 'User not found',
                            })
                        }
                        else {
                            if (groupExists.members.includes(remove_id)) {

                                //not working
                                groupExists.members.filter((item) => { return item !== remove_id })
                                await groupExists.save()

                                //not working
                                userExists.groups.filter((item) => { return item !== group_id })
                                await userExists.save()

                                resolve({
                                    id: group_id,
                                    name: groupExists.name,
                                    admin: user_id,
                                    removed: remove_id
                                })
                            }
                            else {
                                reject({
                                    status: 404,
                                    message: 'User not in group',
                                })
                            }
                        }
                    }
                }
            } catch (error) {
                reject(error)
            }
        })
    }
})