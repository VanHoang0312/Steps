const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    workout_type: String,
    start_time: Date,
    end_time: Date,
    calo_burner: Number,
    distance: Number,
    step: Number,
}, {
    timestamps: true,
    collection: 'workout'
})

const WorkoutModel = mongoose.model('workout', workoutSchema)
module.exports = WorkoutModel