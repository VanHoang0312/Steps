const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema(
  {
    oximeter_id: { type: String, unique: true }, // Để liên kết với file trong GridFS
    filename: String,
    contentType: String,
    uploadDate: { type: Date, default: Date.now },
  },
  {
    collection: "file_metadata", // Lưu metadata riêng nếu cần
  }
);

const FileModel = mongoose.model("File", fileSchema);
module.exports = FileModel;