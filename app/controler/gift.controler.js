const GiftModel = require("../models/gift.model")
const { body, validationResult } = require('express-validator')


//Them thong bao
exports.create = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  var user_id = req.body.user_id
  var giftname = req.body.giftname
  var description = req.body.description
  var dayN = req.body.dayN
  var status = req.body.status
  const icon = req.file ? `app/public/uploads/${req.file.filename}` : "";

  GiftModel.create({
    user_id: user_id,
    giftname: giftname,
    description: description,
    dayN: dayN,
    status: status,
    icon: icon
  })
    .then(data => {
      if (data) {
        res.json('Tao phan thuong thanh cong')
      }
    })
    .catch(err => {
      res.status(500).json('Loi sever')
    })
}

//Sua
exports.update = (req, res, next) => {
  const id = req.params._id;
  const { newgiftname, newdescription, newdayN, newstatus } = req.body;
  const newicon = req.file ? `/uploads/${req.file.filename}` : undefined;

  GiftModel.findById(id)
    .then(gift => {
      if (!gift) {
        return res.status(404).json('Khong tim thay phan thuong');
      }

      const updateData = {
        giftname: newgiftname || gift.giftname,
        description: newdescription || gift.description,
        dayN: newdayN || gift.dayN,
        status: newstatus !== undefined ? newstatus : gift.status,
      };

      if (newicon) {
        // Xóa file icon cũ nếu có
        if (gift.icon) {
          const oldIconPath = path.join(__dirname, '../app/public/uploads', gift.icon);
          fs.unlink(oldIconPath)
            .then(() => console.log("Đã xóa file icon cũ:", oldIconPath))
            .catch(err => console.error("Không thể xóa file icon cũ:", err));
        }
        updateData.icon = newicon;
      }

      return GiftModel.findByIdAndUpdate(id, updateData, { new: true });
    })
    .then(data => {
      res.json('Sua thanh cong');
    })
    .catch(err => {
      console.error("Lỗi khi sửa phần thưởng:", err);
      res.status(500).json('Loi sever');
    });
};


//Xoa
exports.delete = (req, res, next) => {
  var id = req.params.id
  GiftModel.deleteOne({
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
  var giftname = req.body.giftname
  var description = req.body.description
  var dayN = req.body.dayN
  var status = req.body.status
  var icon = req.body.icon

  GiftModel.find({})
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
  GiftModel.findById({ _id })
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.status(500).json('Loi sever')
    })

}

//hien thi khi tim theo user id
exports.getuserid = (req, res, next) => {
  var user_id = req.params.id;
  GiftModel.find({
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