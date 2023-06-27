const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const { config } = require('dotenv')

config()

const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.use(routes)

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: error.message || 'There seems to be some problem.',
    })
})

app.listen(8000, async () => {
    console.log('Server started at http://localhost:8000')
    console.log('Press Ctrl+C to stop')
    await mongoose.connect('mongodb://127.0.0.1:27017/mern-bim')
    console.log('MongoDB connected')
})