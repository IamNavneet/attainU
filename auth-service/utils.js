const Joi = require("joi")

function validateRegister(user) {
    const schema = Joi.object({
        email: Joi.string().required().email().trim(),
        password: Joi.string().required().trim(),
        userType: Joi.string().required().trim()
    })
    return schema.validate(user)
}

function validateLogin(user) {
    const schema = Joi.object({
        email: Joi.string().required().email().trim(),
        password: Joi.string().required().trim(),
    })
    return schema.validate(user)
}

module.exports.validateRegister = validateRegister
module.exports.validateLogin = validateLogin