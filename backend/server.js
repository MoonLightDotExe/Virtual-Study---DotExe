const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db.config')
const bodyParser = require('body-parser')
const userRouter = require('./routes/users.routes')
const groupRouter = require('./routes/groups.routes')
const cors = require('cors')
const multerMiddleware = require('./middlewares/multer')
const utilsRouter = require('./routes/utilities.routes')
const socketIO = require('socket.io')
const Server = socketIO.Server
const http = require('http')
const { NEW_MESSAGE } = require('./constants/events')
const UUID = require('uuid')

const app = express()
// const server = http.createServer(app)
// const io = new Server(server, {})
const io = new Server(3001, {
  cors: {
    origin: "http://localhost:5173",
  }
});

const userSocketIDs = new Map()

const messages = require('./models/messages.models')

app.use(cors())

const PORT = process.env.PORT || 3000

connectDB()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ extended: true, limit: '30mb' }))
app.use(multerMiddleware.attachmentsMulter)

app.get('/', (req, res) => {
  res.send('HELLO')
})

app.use('/api/users', userRouter)

app.use('/api/groups', groupRouter)

app.use('/api/utils', utilsRouter)

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id)
  socket.on(
    NEW_MESSAGE,
    async ({ user_id, username, group_id, members, message }) => {
      const messageForRealTime = {
        content: message,
        _id: UUID.v4(),
        sender: {
          _id: user_id,
          name: username,
        },
      }

      const messageForDB = {
        content: message,
        sender: user_id,
        chat: {
          isGroup: true,
          referenceObjId: group_id,
        },
      }
      const memberSockets = getSockets(members)
      console.log("Member Sockets:", memberSockets)
      io.to(memberSockets).emit(NEW_MESSAGE, {
        group_id,
        message: messageForRealTime,
      })
      try {
        await messages.create(messageForDB)
      } catch (error) {
        console.log(error)
      }
    }
  )
  socket.on("SET_ID", (user_id) => {
    userSocketIDs.set(user_id, socket.id)
    console.log("socket map:", userSocketIDs)
  })
  socket.on('disconnect', (user_id) => {
    console.log('User Disconnected')
    userSocketIDs.delete(user_id)
    console.log(userSocketIDs)
  })
})

const getSockets = (users = []) => {
  const sockets = users.map((user) => userSocketIDs.get(user.toString()))
  return sockets
}
// server.listen(3001, () => {
//   console.log('Sockets listening on 3001')
// })

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
