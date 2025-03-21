const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dailyactivitySchema = new Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    day: { type: Date, required: true, default: Date.now },
    steps: { type: Number, required: true, default: 0 },
    distance: { type: Number, required: true, default: 0 },
    calories: { type: Number, required: true, default: 0 },
    activeTime: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
    collection: 'dailyactivity',
  }
);

// Thêm index
dailyactivitySchema.index({ user_id: 1, day: 1 });

const DailyactivityModel = mongoose.model('dailyactivity', dailyactivitySchema);
module.exports = DailyactivityModel;