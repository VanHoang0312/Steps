const express = require("express");
const router = express.Router();
const fileController = require("../controler/file.controler");

// Upload file
router.post("/upload", fileController.uploadFile);

// Download file
router.get("/pulse-oximeter/phantich/:oximeter_id", fileController.downloadFile);

// Xóa file (tùy chọn)
router.delete("/delete/:oximeter_id", fileController.deleteFile);

module.exports = router;