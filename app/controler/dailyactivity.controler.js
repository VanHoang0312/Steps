const DailyactivityModel = require("../models/dailyactivity.model")
const { body, validationResult } = require('express-validator')
const mongoose = require("mongoose");


//Them hoat dong
exports.create = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  var user_id = req.body.user_id
  var date = req.body.date
  var steps = req.body.steps
  var distance = req.body.distance
  var calo = req.body.calo
  var active_minutes = req.body.active_minutes

  DailyactivityModel.create({
    user_id: user_id,
    date: date,
    steps: steps,
    distance: distance,
    calo: calo,
    active_minutes: active_minutes
  })
    .then(data => {
      if (data) {
        res.json('Tao hoat dong thanh cong')
      }
    })
    .catch(err => {
      res.status(500).json('Loi sever')
    })
}


//Sua
exports.update = (req, res, next) => {
  var id = req.params._id
  var newdate = req.body.newdate
  var newsteps = req.body.newsteps
  var newdistance = req.body.newdistance
  var newcalo = req.body.newcalo
  var newactive_minutes = req.body.newactive_minutes

  DailyactivityModel.findByIdAndUpdate(id, {
    date: newdate,
    steps: newsteps,
    distance: newdistance,
    calo: newcalo,
    active_minutes: newactive_minutes,

  })
    .then(data => {
      res.json('Sua thanh cong')
    })
    .catch(err => {
      res.status(500).json('Loi sever')
    })
}


//Xoa
exports.delete = (req, res, next) => {
  var id = req.params.id
  DailyactivityModel.deleteOne({
    _id: id
  })
    .then(data => {
      res.json('Xoa thanh cong')
    })
    .catch(err => {
      res.status(500).json('Loi sever')
    })
}


//Lay
exports.get = (req, res, next) => {
  var user_id = req.body.user_id
  var date = req.body.date
  var steps = req.body.steps
  var distance = req.body.distance
  var calo = req.body.calo
  var active_minutes = req.body.active_minutes

  DailyactivityModel.find({})
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.status(500).json('Loi sever')
    })
}

//lay theo id
exports.getById = (req, res, next) => {
  var _id = req.params.id;
  DailyactivityModel.findById({ _id })
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.status(500).json('Loi sever')
    })

}

//hien thi hoat dong khi tim theo user id
exports.getuserid = (req, res, next) => {
  var user_id = req.params.id;

  DailyactivityModel.find({
    user_id: user_id,
  })
    .then(data => {
      if (data.length > 0) {
        res.json(data);
      } else {
        res.json('K tim thay');
      }
    })
    .catch(err => {
      res.status(500).json('Lỗi server');
    });
}


// Tổng hợp số bước chân theo tuần
exports.getWeeklySummary = (req, res, next) => {

  var user_id = req.params.user_id;

  DailyactivityModel.aggregate([
    {
      // Lọc theo user_id
      $match: { user_id: new mongoose.Types.ObjectId(user_id) },
    },
    {
      // Thêm trường tuần và năm từ ngày
      $addFields: {
        week: { $isoWeek: "$date" }, // Sử dụng $isoWeek cho tuần ISO
        year: { $year: "$date" },    // Lấy năm từ trường ngày
      },
    },
    {
      // Nhóm theo tuần và năm
      $group: {
        _id: { year: "$year", week: "$week" },
        totalSteps: { $sum: "$steps" },      // Tổng số bước chân
        totalDistance: { $sum: "$distance" }, // Tổng quãng đường
        totalCalo: { $sum: "$calo" },         // Tổng calo
        totalActive_minutes: { $sum: "$active_minutes" } // Tổng hợp thời gian
      },
    },
    {
      // Sắp xếp theo năm và tuần
      $sort: { "_id.year": 1, "_id.week": 1 },
    },
    {
      // Định dạng kết quả đầu ra
      $project: {
        _id: 0,
        year: "$_id.year",
        week: "$_id.week",
        totalSteps: 1,
        totalDistance: 1,
        totalCalo: 1,
        totalActive_minutes: 1
      },
    },
  ])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json("Lỗi server");
    });
};


// Tổng hợp số bước chân hoạt động theo tháng của user_id
exports.getMonthlySummary = (req, res, next) => {
  var user_id = req.params.user_id;

  DailyactivityModel.aggregate([
    {
      // Lọc theo user_id
      $match: { user_id: new mongoose.Types.ObjectId(user_id) },
    },
    {
      // Thêm trường tháng và năm từ ngày
      $addFields: {
        month: { $month: "$date" }, // Lấy tháng từ trường ngày
        year: { $year: "$date" },   // Lấy năm từ trường ngày
      },
    },
    {
      // Nhóm theo tháng và năm
      $group: {
        _id: { year: "$year", month: "$month" },
        totalSteps: { $sum: "$steps" },            // Tổng số bước chân
        totalDistance: { $sum: "$distance" },      // Tổng quãng đường
        totalCalo: { $sum: "$calo" },              // Tổng calo
        totalActive_minutes: { $sum: "$active_minutes" }, // Tổng thời gian hoạt động
      },
    },
    {
      // Sắp xếp theo năm và tháng
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
    {
      // Định dạng kết quả đầu ra
      $project: {
        _id: 0,
        year: "$_id.year",
        month: "$_id.month",
        totalSteps: 1,
        totalDistance: 1,
        totalCalo: 1,
        totalActive_minutes: 1,
      },
    },
  ])
    .then((data) => {
      res.json(data); // Trả về dữ liệu tổng hợp
    })
    .catch((err) => {
      res.status(500).json("Lỗi server");
    });
};



