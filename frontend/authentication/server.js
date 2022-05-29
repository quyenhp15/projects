const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routeURLs = require('./routes/routes')
const cors = require('cors')

dotenv.config
// mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("Database connected"))
mongoose.connect("mongodb+srv://User:user@cluster0.dqtd4et.mongodb.net/user?retryWrites=true&w=majority",
    () => console.log("Database connected"))

app.use(express.json())
app.use(cors())
app.use('/app', routeURLs)
app.listen(4000, () => console.log("SERVER running"))
