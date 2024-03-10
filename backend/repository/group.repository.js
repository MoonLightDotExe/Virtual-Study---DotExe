const dotenv = require('dotenv').config()
const { emitEvent } = require('../config/features.js')
const groups = require('../models/groups.models.js')
const users = require('../models/users.models.js')
const messages = require('../models/messages.models.js')
const AWS = require('aws-sdk');
const axios = require('axios')

// Configure AWS SDK with your credentials and S3 bucket information
const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

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
    },
    get_my_groups: (body) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { user_id } = body
                if (!user_id) {
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
                        const groupIds = userExists.groups
                        let userGroups = []
                        for (let i = 0; i < groupIds.length; i++) {
                            const grp = await groups.findOne({ _id: groupIds[i] }).populate("members", "name")
                            userGroups.push(grp)
                        }
                        resolve({
                            id: user_id,
                            groups: userGroups
                        })
                    }
                }
            } catch (error) {
                reject(error)
            }
        })
    },
    send_attachment: (body, file) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { group_id, user_id } = body
                if (!group_id || !user_id) {
                    reject({
                        status: 400,
                        message: 'Missing Data!',
                    })
                }
                else {
                    const groupExists = await groups.findById(group_id)
                    const { name } = await users.findById(user_id)
                    const files = file
                    console.log(files)
                    if (!files) {
                        reject({
                            status: 400,
                            message: 'No file uploaded!',
                        })
                    }
                    else {
                        //upload file to amazon s3 bucket
                        const uploadFileToS3 = async (file) => {
                            const bucketName = process.env.S3_BUCKET_NAME; // Replace with your bucket name
                            const fileName = files.originalname; // Replace with the desired name for the file in the bucket
                            const fileContent = files.buffer; // Assuming 'file' contains the data of the file

                            // Setting up S3 upload parameters
                            const params = {
                                Bucket: bucketName,
                                Key: fileName,
                                Body: fileContent,
                            };

                            try {
                                const data = await s3.upload(params).promise();
                                console.log('File uploaded successfully to:', data.Location);
                                return data.Location; // Returning the URL of the uploaded file
                            } catch (error) {
                                console.error('Error uploading file to S3:', error);
                                throw error;
                            }
                        };
                        const uploadedFileUrl = await uploadFileToS3(files);
                        console.log('Uploaded file URL:', uploadedFileUrl);

                        const entryForDB = {
                            name: files.originalname,
                            link: uploadedFileUrl
                        }

                        groupExists.resources.push(entryForDB)
                        await groupExists.save()

                        const messageForDB = {
                            content: "",
                            // attachments,
                            sender: user_id,
                            chat: {
                                isGroup: true,
                                referenceObjId: group_id
                            }
                        }

                        const messageForRealTime = {
                            content: "",
                            // attachments,
                            group_id,
                            sender: {
                                _id: user_id,
                                name
                            },

                        }

                        const message = await messages.create(messageForDB)

                        resolve({
                            messageForRealTime,
                            messageForDB,
                            members: groupExists.members
                        })
                    }
                }
            } catch (error) {
                console.log(error)
                reject(error)
            }
        })
    },
    get_group_messages: (body) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { group_id } = body
                const response = await messages.find({
                    'chat.isGroup': true,
                    'chat.referenceObjId': group_id
                }).populate('sender', 'name')
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    },
    get_group_resources: (body) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { group_id } = body
                const groupExists = await groups.findById(group_id)
                const resources = groupExists.resources
                let getNames = []
                for (let i = 0; i < resources.length; i++) {
                    getNames.push(resources[i].name)
                }
                console.log(getNames)

                let sendResults = []

                for (let i = 0; i < getNames.length; i++) {
                    // Generate a presigned URL to retrieve the file
                    const params = {
                        Bucket: process.env.S3_BUCKET_NAME,
                        Key: getNames[i],
                        Expires: 3600 // URL expiration time in seconds (e.g., 3600 for 1 hour)
                    };

                    // Get the presigned URL
                    const presignedUrl = s3.getSignedUrl('getObject', params);
                    sendResults.push({ name: getNames[i], url: presignedUrl })
                }
                console.log(sendResults)
                resolve(sendResults)
            } catch (error) {
                console.log(error)
                reject(error)
            }
        })
    }
})