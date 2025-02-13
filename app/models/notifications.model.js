const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationsSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    title: String,
    message: String,
    read_status: Boolean,
}, {
    timestamps: true,
    collection: 'notifications'
})

const NotificationsModel = mongoose.model('notifications', notificationsSchema)
module.exports = NotificationsModel