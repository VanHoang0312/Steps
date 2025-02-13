const NotificationsModel = require("../models/notifications.model")
const { body, validationResult } = require('express-validator')


//Them thong bao
exports.create = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  var user_id = req.body.user_id
  var title = req.body.title
  var message = req.body.message
  var read_status = req.body.read_status

  NotificationsModel.create({
    user_id: user_id,
    title: title,
    message: message,
    read_status: read_status,
  })
    .then(data => {
      if (data) {
        res.json('Tao thong bao thanh cong')
      }
    })
    .catch(err => {
      res.status(500).json('Loi sever')
    })
}


//Sua
exports.update = (req, res, next) => {
  var id = req.params._id
  var newtitle = req.body.newtitle
  var newmessage = req.body.newmessage
  var newread_status = req.body.newread_status

  
  NotificationsModel.findByIdAndUpdate(id, {
    title: newtitle,
    message: newmessage,
    read_status: newread_status,
    
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
  NotificationsModel.deleteOne({
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
  var title = req.body.title
  var message = req.body.message
  var read_status = req.body.read_status

  NotificationsModel.find({})
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
  NotificationsModel.findById({ _id })
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
  
  NotificationsModel.find({
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