const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dailyactivitySchema = new Schema({
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    date: Date,
    steps : Number,
    distance: Number,
    calo: Number,
    active_minutes: Number,
}, {timestamps: true,
    collection: 'dailyactivity'
})

const DailyactivityModel = mongoose.model('dailyactivity', dailyactivitySchema)
module.exports = DailyactivityModel