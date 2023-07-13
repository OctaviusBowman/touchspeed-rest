require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
var PORT = 3000

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))



app.use(express.json())

const profileRouter = require('./routes/profiles')
app.use('/profiles', profileRouter)


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))