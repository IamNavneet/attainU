const Joi = require("joi")

function validateCreate(post) {
    const schema = Joi.object({
        postTitle: Joi.string().required().max(50).trim(),
        postContent: Joi.string().required().max(255).trim(),
    })
    return schema.validate(post)
}

function validateId(id) {
    const schema = Joi.object({
        id: Joi.string().required().trim(),
    })
    return schema.validate(id)
}

module.exports.validateCreate = validateCreate
module.exports.validateId = validateId