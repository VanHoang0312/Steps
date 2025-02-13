const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    age: Number,
    gender: String,
    weight: Number,
    height: Number,
    
}, {timestamps: true,
    collection: 'user'
})

const UserModel = mongoose.model('user', userSchema)
module.exports = UserModel