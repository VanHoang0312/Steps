const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const controler = require('../controler/goals.controler')


//Lay
router.get('/layall', controler.get)
    
router.get('/:id', controler.getById)

//hien thi hd khi tim theo user id
router.get('/user/:id', controler.getuserid)
 
//Them hoat dong
router.post('/taomuctieu',
    [
        body('target_value').notEmpty().withMessage('Chua nhap loai muc tieu'),
        body('user_id').notEmpty().withMessage('Chua nhap id ng dung'),
    ],
    controler.create )

//Sua
router.put('/:id', controler.update)
  
//Xoa
router.delete('/:id', controler.delete)

module.exports = router