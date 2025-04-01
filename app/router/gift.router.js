const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const controler = require('../controler/gift.controler')
const { upload } = require('../controler/upload.controler')


//Lay
router.get('/layall', controler.get)

router.get('/:id', controler.getById)

router.get('/user/:id', controler.getuserid)

router.post('/taophanthuong', upload.single("icon"),
  [
    body('description').notEmpty().withMessage('Chua nhap mo ta'),
    body('user_id').notEmpty().withMessage('Chua nhap id ng dung'),
  ],
  controler.create)

//Sua
router.put('/:id', upload.single('icon'), controler.update)

//Xoa
router.delete('/:id', controler.delete)

module.exports = router