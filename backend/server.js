const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routeURLs = require('./routes/routes')
const cors = require('cors')

const multer = require('multer')

dotenv.config
try {
    mongoose.connect("mongodb+srv://User:user@cluster0.dqtd4et.mongodb.net/user?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log("Database connected"))
} catch (error) {
    console.log("Could not connect database. Erro: ", error)
}


app.use(express.json())
app.use(cors())
app.use('/LibSystem', routeURLs)
app.listen(4000, () => console.log("SERVER running 4000"))
