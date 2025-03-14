const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const controler = require('../controler/user.controler');
const { verifyToken } = require('../midleware');


router.post('/register',
  [
    body('name').notEmpty().withMessage('name khong duoc phep de trong'),
    body('password').notEmpty().withMessage('password khong duoc phep de trong'),
  ],
  controler.register
);
//Danh nhap
router.post('/login', controler.login)
//Lay 
// router.get('/layall', controler.get)
//Lay theo id
// router.get('/:id', controler.getById)
//Sua
router.put('/:id', controler.update)
//Xoa
router.delete('/:id', controler.delete)
//getcurenData
router.get('/curendata', verifyToken, controler.getCurrent)


module.exports = router