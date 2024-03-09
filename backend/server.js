const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db.config')
const bodyParser = require('body-parser')
const userRouter = require('./routes/users.routes')
const groupRouter = require('./routes/groups.routes')
const cors = require('cors')

const app = express()

app.use(cors())

const PORT = process.env.PORT || 3000

connectDB()

app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '30mb', extended: true }))

app.get('/', (req, res) => {
    res.send('HELLO')
})

app.use('/api/users', userRouter)

app.use('/api/groups', groupRouter)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
