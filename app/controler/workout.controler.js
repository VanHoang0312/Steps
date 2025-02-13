const WorkoutModel = require("../models/workout")
const { body, validationResult } = require('express-validator')


//Them bai tap
exports.create = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  var user_id = req.body.user_id
  var workout_type = req.body.workout_type
  var start_time = req.body.start_time
  var end_time = req.body.end_time
  var calo_burner = req.body.calo_burner
  var distance = req.body.distance
  var step = req.body.step

  WorkoutModel.create({
    user_id: user_id,
    workout_type: workout_type,
    start_time: start_time,
    end_time: end_time,
    calo_burner: calo_burner,
    distance: distance,
    step: step
  })
    .then(data => {
      if (data) {
        res.json('Tao bai tap thanh cong')
      }
    })
    .catch(err => {
      res.status(500).json('Loi sever')
    })
}


//Sua
exports.update = (req, res, next) => {
  var id = req.params._id
  var newworkout_type = req.body.newworkout_type
  var newstart_time = req.body.newstart_time
  var newend_time = req.body.newend_time
  var newcalo_burner = req.body.newcalo_burner
  var newdistance = req.body.newdistance
  var newstep = req.body.newstep
  
  WorkoutModel.findByIdAndUpdate(id, {
    workout_type: newworkout_type,
    start_time: newstart_time,
    end_time: newend_time,
    calo_burner: newcalo_burner,
    distance: newdistance,
    step:newstep
    
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
  WorkoutModel.deleteOne({
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
  var workout_type = req.body.workout_type
  var start_time = req.body.start_time
  var end_time = req.body.end_time
  var calo_burner = req.body.calo_burner
  var distance = req.body.distance
  var step = req.body.step

  WorkoutModel.find({})
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
  WorkoutModel.findById({ _id })
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
  
  WorkoutModel.find({
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