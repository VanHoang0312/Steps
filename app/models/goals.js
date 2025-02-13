const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goalsSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    goal_type: String,
    target_value: Number,// Giá trị mục tiêu
    current_value: Number,// Giá trị hiện tại (cập nhật dần)
    start_date: Date,
    end_date: Date,
}, {
    timestamps: true,
    collection: 'goals'
})

const GoalsModel = mongoose.model('goals', goalsSchema)
module.exports = GoalsModel