const jwt = require('jsonwebtoken')

async function isAuthenticated(req, res, next) {
    // console.log(req.headers['authorization'].split(" "))
    const token = req.headers['authorization'].split(" ")[2];
    // console.log(token)
    jwt.verify(token, "secretKey", (err, user) => {
        if (err) {
            return res.json({ message: err })
        }
        else {
            req.user = user
            next();
        }
    })
}

module.exports = isAuthenticated;