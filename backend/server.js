const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db.config')
const bodyParser = require('body-parser')
const userRouter = require('./routes/users.routes')
const groupRouter = require('./routes/groups.routes')
const cors = require('cors')
const multerMiddleware = require('./middlewares/multer')
const socketIO = require('socket.io')
const Server = socketIO.Server
const http = require('http')
const { NEW_MESSAGE } = require('./constants/events')
const UUID = require('uuid')

const app = express()
const server = http.createServer(app)
const io = new Server(server, {})

const userSocketIDs = new Map()

const messages = require('./models/messages.models')

app.use(cors())

const PORT = process.env.PORT || 3000

connectDB()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ extended: true, limit: '30mb' }))
app.use(multerMiddleware.attachmentsMulter);

app.get('/', (req, res) => {
    res.send('HELLO')
})

app.use('/api/users', userRouter)

app.use('/api/groups', groupRouter)

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id)
    socket.on(NEW_MESSAGE, async ({ user_id, username, group_id, members, message }) => {
        userSocketIDs.set(user_id, socket.id)
        const messageForRealTime = {
            content: message,
            _id: UUID.v4(),
            sender: {
                _id: user_id,
                name: username
            }
        }

        const messageForDB = {
            content: message,
            sender: user_id,
            chat: {
                isGroup: true,
                referenceObjId: group_id
            }
        }
        const memberSockets = getSockets(members)
        io.to(memberSockets).emit(NEW_MESSAGE, {
            group_id,
            message: messageForRealTime
        })
        try {
            await messages.create(messageForDB)
        } catch (error) {
            console.log(error)
        }
    })
    socket.on('disconnect', () => {
        console.log('User Disconnected')
        userSocketIDs.delete(user._id.toString())
    })
})

const getSockets = (users = []) => {
    const sockets = users.map((user) => userSocketIDs.get(user.toString()))
    return sockets
}

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
