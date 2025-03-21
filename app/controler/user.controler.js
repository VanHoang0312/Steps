const UserModel = require('../models/user.model')
const { body, validationResult } = require('express-validator')
const bcrybt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken')

//register
exports.register = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  var name = req.body.name
  var email = req.body.email
  var password = req.body.password
  // var age = req.body.age
  // var gender = req.body.gender
  // var weight = req.body.weight
  // var height = req.body.height


  let mahoamatkhau = '';
  bcrybt.genSalt(saltRounds, (err, salt) => {
    bcrybt.hash(password, salt, (err, hash) => {
      mahoamatkhau = hash;
      UserModel.findOne({
        email: email
      })
        .then(data => {
          if (data) {
            res.json('Acc nay da ton tai')
          } else {
            return UserModel.create({
              name: name,
              password: mahoamatkhau,
              email: email,
              role: "USER"
              // age: age,
              // gender: gender,
              // weight: weight,
              // height: height
            })
          }
        })
        .then(data => {
          if (data) {
            res.json('Tao acc thanh cong')
          }
        })
        .catch(err => {
          res.status(500).json('Tao acc that bai')
        })
    })
  })
}


//login
exports.login = async (req, res, next) => {
  var name = req.body.name
  var password = req.body.password
  var email = req.body.email
  //   var age = req.body.age
  //   var gender = req.body.gender
  //   var weight = req.body.weight
  //   var height = req.body.height


  UserModel.findOne({
    name: name,
    email: email
  })
    .then(data => {
      if (!data) {
        return res.status(500).json('Tai khoan khong chinh xac')
      }

      const checkPassword = bcrybt.compareSync(password, data.password)
      if (!checkPassword) {
        return res.status(500).json('Mat khau khong chinh xac')
      } else {
        var token = jwt.sign({
          _id: data._id,
          role: data.role
        }, 'mk', { expiresIn: '365d' })
        return res.status(200).json({
          message: 'Dang nhap thanh cong roiii',
          token: token
        })
      }
    })
    .catch(error => {
      res.status(500).json('Loi sever')
    })
}

// lấy ra thằng user đang đăng nhập
exports.getCurrent = async (req, res, next) => {
  try {
    var _id = req.user._id;
    UserModel.findById({ _id })
      .then((data) => {
        return res.json({
          status: "OKE",
          message: {
            _id: data._id,
            name: data.name,
            email: data.email,
            role: data.role,
          },
        });
      })
      .catch((err) => {
        res.status(500).json("Loi server");
      });
  } catch (err) {
    res.status(500).json("Loi server");
  }
};


//Lấy dữ liệu
// exports.get = (req, res, next) => {
//   var name = req.body.name
//   var password = req.body.password
//   var email = req.body.email
//   // var age = req.body.age
//   // var gender = req.body.gender
//   // var weight = req.body.weight
//   // var height = req.body.height
//   UserModel.find({})
//     .then(data => {
//       res.json(data)
//     })
//     .catch(err => {
//       res.status(500).json('Dang bi loi')
//     })

// }


//Sửa
exports.update = (req, res, next) => {
  var id = req.params._id
  var newpassword = req.body.newpassword
  var newemail = req.body.newemail
  var newname = req.body.newname
  // var newage = req.body.age
  // var newweight = req.body.newweight
  // var newgender = req.body.newgender
  // var newheight = req.body.newheight

  UserModel.findByIdAndUpdate(id, {
    password: newpassword,
    email: newemail,
    name: newname,
    // age: newage,
    // weight: newweight,
    // gender: newgender,
    // height: newheight,
  })
    .then(data => {
      res.json('Sua thanh cong')
    })
    .catch(err => {
      res.status(500).json('Loi sever')
    })
}


// exports.getById = (req, res, next) => {
//   var id = req.params._id

//   UserModel.findById({ id })
//     .then(data => {
//       res.json(data)
//     })
//     .catch(err => {
//       res.status(500).json('Dang bi loi')
//     })

// }

//Xóa
exports.delete = (req, res, next) => {
  var id = req.params.id
  UserModel.deleteOne({
    _id: id
  })
    .then(data => {
      res.json('Xoa thanh cong')
    })
    .catch(err => {
      res.status(500).json('Loi sever')
    })
}
