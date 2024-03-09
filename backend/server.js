const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db.config')
const bodyParser = require('body-parser')
const userRouter = require('./routes/users.routes')
const groupRouter = require('./routes/groups.routes')
const cors = require('cors')
const multerMiddleware = require('./middlewares/multer')

const app = express()

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

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
