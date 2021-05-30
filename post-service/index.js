const express = require('express')
const app = express()
const mongo = require('mongoose')
const postRoute = require('./routes/postRoute')


mongo.connect('mongodb://localhost/attainU',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log("connected to user service")
    })


app.use(express.json())
app.use('/api/post', postRoute)

app.listen(3002, () => {
    console.log(`User service is running on 3002`)
})