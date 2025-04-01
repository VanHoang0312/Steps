const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const giftSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    giftname: String,
    description: String,
    dayN: Date,
    status: Boolean,
    icon: String
}, {
    timestamps: true,
    collection: 'gift'
})

const GiftModel = mongoose.model('gift', giftSchema)
module.exports = GiftModel