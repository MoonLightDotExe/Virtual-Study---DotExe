const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const connectDB = async (req, res) => {
    const MONGOOSE_OPTIONS = {
        dbName: 'VirtualStudy',
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 60000,
    }
    const MONGO_URI = process.env.MONGO_URI

    const connect = await mongoose.connect(MONGO_URI, MONGOOSE_OPTIONS)
    console.log(`Database Connected on: ${connect.connection.host}`)

    try {
    } catch (err) {
        throw new Error(err)
    }
}

module.exports = connectDB