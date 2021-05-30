const mongo = require('mongoose')
const Schema = mongo.Schema
const userSchema = new Schema({
    email : String,
    password : String,
    userType : String,
    created_at : {type:Date, default: Date.now()},
    modified_at : {type:Date, default: Date.now()}
})

module.exports = User = mongo.model("user", userSchema);