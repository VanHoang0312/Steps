const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    role: {
        enum: ["ADMIN", "USER"],
        type: String,
    }
  
}, {timestamps: true,
    collection: 'user'
})

const UserModel = mongoose.model('user', userSchema)
module.exports = UserModel