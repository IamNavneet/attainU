const express = require('express')
const app = express()
const mongo = require('mongoose')
const authRoute = require('./routes/authRoute')


mongo.connect('mongodb://localhost/attainU',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log("connected to auth service")
    })


app.use(express.json())
app.use('/api/auth', authRoute)

app.listen(3001, () => {
    console.log(`Auth service is running on 3001`)
})