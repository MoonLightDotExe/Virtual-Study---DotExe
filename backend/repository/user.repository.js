const dotenv = require('dotenv').config()
const bcrypt = require('bcryptjs')
const users = require('../models/users.models.js')
const jwt = require('jsonwebtoken')

const self = (module.exports = {
    register: (body) => {
        console.log(body)
        return new Promise(async (resolve, reject) => {
            try {
                const { name, email, password } = body

                if (!name || !email || !password) {
                    reject({
                        status: 400,
                        message: 'Missing Data!',
                    })
                }
                else {
                    const userExists = await users.findOne({ email })

                    if (userExists) {
                        reject({
                            status: 401,
                            message: 'User already exists!',
                        })
                    }
                    else {
                        const salt = await bcrypt.genSalt(10)
                        const hashedPassword = await bcrypt.hash(password, salt)
                        const user = await users.create({
                            name,
                            email,
                            password: hashedPassword
                        })
                        resolve({
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            password: user.password,
                            token: self.generateToken(user._id),
                        })
                    }
                }
            } catch (error) {
                reject(error)
            }
        })
    },
    login: (body) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { email, password } = body
                const userExists = await users.findOne({ email })
                if (!email || !password) {
                    reject({
                        status: 400,
                        message: 'Missing Data!',
                    })
                }
                else {
                    if (!userExists) {
                        reject({
                            status: 401,
                            message: 'User Not Found!',
                        })
                    }
                    else {
                        //match password
                        const matchPassword = await bcrypt.compare(password, userExists.password)

                        if (matchPassword) {
                            resolve({
                                id: userExists._id,
                                name: userExists.name,
                                email: userExists.email,
                                token: self.generateToken(userExists._id),
                            })
                        }
                        else {
                            reject({
                                status: 401,
                                message: 'Password Not Matched!',
                            })
                        }
                    }
                }
            } catch (error) {
                reject(error)
            }
        })
    },
    generateToken: () => {
        return jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
    },
})