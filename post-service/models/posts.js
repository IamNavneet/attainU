const mongo = require('mongoose')
const Schema = mongo.Schema
const postSchema = new Schema({
    postTitle: {
        type: String,
        maxlength: 50
    },
    postContent: {
        type: String,
        maxlength: 255
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    modified_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Posts = mongo.model("posts", postSchema);