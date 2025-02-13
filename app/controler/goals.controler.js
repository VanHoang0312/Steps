const GoalsModel = require("../models/goals")
const { body, validationResult } = require('express-validator')


//Them goals
exports.create = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  var user_id = req.body.user_id
  var goal_type = req.body.goal_type
  var target_value = req.body.target_value
  var current_value = req.body.current_value
  var start_date = req.body.start_date
  var end_date = req.body.end_date

  GoalsModel.create({
    user_id: user_id,
    goal_type: goal_type,
    target_value: target_value,
    current_value: current_value,
    start_date: start_date,
    end_date: end_date
  })
    .then(data => {
      if (data) {
        res.json('Tao goal thanh cong')
      }
    })
    .catch(err => {
      res.status(500).json('Loi sever')
    })
}


//Sua
exports.update = (req, res, next) => {
  var id = req.params._id
  var newgoal_type = req.body.newgoal_type
  var newtarget_value = req.body.newtarget_value
  var newcurrent_value = req.body.newcurrent_value
  var newstart_date = req.body.newstart_date
  var newend_date = req.body.newend_date
  
  GoalsModel.findByIdAndUpdate(id, {
    goal_type: newgoal_type,
    target_value: newtarget_value,
    current_value: newcurrent_value,
    start_date: newstart_date,
    end_date: newend_date,
    
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
  GoalsModel.deleteOne({
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
  var goal_type = req.body.goal_type
  var target_value = req.body.target_value
  var current_value = req.body.current_value
  var start_date = req.body.start_date
  var end_date = req.body.end_date

  GoalsModel.find({})
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
  GoalsModel.findById({ _id })
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.status(500).json('Loi sever')
    })

}

//hien thi goal khi tim theo user id
exports.getuserid = (req, res, next) => {
  var user_id = req.params.id;
  
  GoalsModel.find({
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