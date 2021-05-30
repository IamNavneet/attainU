const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { validateRegister, validateLogin } = require('../utils')


router.post('/register', async (req, res) => {

    const { error } = await validateRegister(req.body)
    if (error) return res.send(error.details[0].message)
    const { email, password, userType } = req.body
    const userExist = await User.findOne({ email })

    if (userExist) {
        return res.json({ message: "User already registered" })
    }

    const newUser = new User({
        email: email,
        password: password,
        userType: userType
    })

    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, salt)

    await newUser.save()

    res.json({ message: "User registered successfully, please proceed to login" })
})


router.post('/login', async (req, res) => {

    const { error } = await validateLogin(req.body)
    if (error) return res.send(error.details[0].message)

    const { email, password } = req.body

    let user = await User.findOne({ email })
    if (!user) return res.json({ message: "User does not exists" })

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.json({ message: "Invalid credentials" })

    console.log(user, "<--user type")
    const payload = { id: user._id, email: user.email, userType: user.userType }
    jwt.sign(payload, "secretKey", (err, token) => {
        if (err) console.log(err)
        else {
            res.json({ message: "Login successful", token: token })
        }
    })




})

module.exports = router