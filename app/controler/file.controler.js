const mongoose = require("mongoose");
const multer = require("multer");
const FileModel = require("../models/file.model");
const PDFDocument = require("pdfkit");

let gfsBucket;
let upload = multer({ storage: multer.memoryStorage() });

const initializeStorage = () => {
  return new Promise((resolve, reject) => {
    mongoose.connection.once("open", () => {
      console.log("Kết nối MongoDB đã mở");
      gfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });
      resolve();
    }).on("error", (err) => {
      console.error("Lỗi kết nối MongoDB:", err);
      reject(err);
    });
  });
};

initializeStorage()
  .then(() => {
    console.log("GridFS đã được khởi tạo thành công");
  })
  .catch((err) => {
    console.error("Không thể khởi tạo GridFS:", err);
    process.exit(1);
  });

const ensureStorage = (req, res, next) => {
  if (!gfsBucket || !upload) {
    return res.status(503).json({ success: false, message: "GridFS chưa sẵn sàng" });
  }
  next();
};

exports.uploadFile = [
  ensureStorage,
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "Không có tệp nào được tải lên" });
      }

      const oximeter_id = `oximeter_${Date.now()}`;
      const writeStream = gfsBucket.openUploadStream(req.file.originalname, {
        metadata: { oximeter_id },
      });

      writeStream.write(req.file.buffer);
      writeStream.end();

      await new Promise((resolve, reject) => {
        writeStream.on("finish", () => {
          console.log("Tệp đã được ghi vào GridFS");
          resolve();
        });
        writeStream.on("error", reject);
      });

      const fileDoc = await FileModel.create({
        oximeter_id,
        filename: req.file.originalname,
        contentType: req.file.mimetype,
      });

      res.json({
        success: true,
        message: "Tệp được tải lên thành công",
        oximeter_id,
      });
    } catch (err) {
      console.error("Lỗi khi tải tệp:", err);
      res.status(500).json({ success: false, message: "Lỗi server", error: err.message });
    }
  },
];


exports.downloadFile = [
  ensureStorage,
  async (req, res) => {
    try {
      const oximeter_id = req.params.oximeter_id;
      const file = await gfsBucket.find({ "metadata.oximeter_id": oximeter_id }).toArray();
      if (!file || file.length === 0) {
        return res.status(404).json({ success: false, message: "Không tìm thấy tệp" });
      }
      const readStream = gfsBucket.openDownloadStream(file[0]._id);
      let fileContent = "";
      await new Promise((resolve, reject) => {
        readStream.on("data", (chunk) => (fileContent += chunk.toString()));
        readStream.on("end", resolve);
        readStream.on("error", reject);
      });
      let data;
      try {
        data = JSON.parse(fileContent);
      } catch (err) {
        return res.status(400).json({ success: false, message: "Định dạng JSON không hợp lệ trong tệp" });
      }
      const doc = new PDFDocument();
      res.set("Content-Type", "application/pdf");
      res.set("Content-Disposition", `attachment; filename="${oximeter_id}.pdf"`);
      doc.pipe(res);
      doc.fontSize(20).text("Báo cáo đo lường Oximeter", { align: "center" });
      doc.moveDown();
      doc.fontSize(12).text(`Oximeter ID: ${oximeter_id}`);
      doc.moveDown();
      doc.text(`Nhịp tim: ${data.heart_rate || "Không có dữ liệu"} bpm`);
      doc.text(`SpO2: ${data.spo2 || "Không có dữ liệu"} %`);
      doc.text(`PI: ${data.pi || "Không có dữ liệu"} %`);
      doc.text(`Thời gian đo: ${data.time || "Không có dữ liệu"}`);
      doc.moveDown();
      doc.text(`Ngày tạo báo cáo: ${new Date().toLocaleString()}`);
      doc.end();
    } catch (err) {
      console.error("Lỗi tải xuống:", err);
      res.status(500).json({ success: false, message: "Lỗi server", error: err.message });
    }
  },
];

exports.deleteFile = [
  ensureStorage,
  async (req, res) => {
    try {
      const oximeter_id = req.params.oximeter_id;
      const file = await gfsBucket.find({ "metadata.oximeter_id": oximeter_id }).toArray();
      if (!file || file.length === 0) {
        return res.status(404).json({ success: false, message: "Không tìm thấy tệp" });
      }
      await gfsBucket.delete(file[0]._id);
      const deleteResult = await FileModel.deleteOne({ oximeter_id });
      console.log("Metadata đã xóa:", deleteResult);
      res.json({ success: true, message: "Tệp đã được xóa thành công" });
    } catch (err) {
      console.error("Lỗi xóa:", err);
      res.status(500).json({ success: false, message: "Lỗi server", error: err.message });
    }
  },
];