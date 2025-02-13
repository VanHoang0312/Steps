const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const controler = require('../controler/dailyactivity.controler')


//Lay
router.get('/layall', controler.get)
    
router.get('/:id', controler.getById)

//hien thi hd khi tim theo user id
router.get('/user/:id', controler.getuserid)
 
//Them hoat dong
router.post('/taohoatdong',
    [
        body('steps').notEmpty().withMessage('Chua nhap so buoc'),
        body('calo').notEmpty().withMessage('Chua nhap calo'),
    ],
    controler.create )

//Sua
router.put('/:id', controler.update)
  
//Xoa
router.delete('/:id', controler.delete)

// Route lấy tổng hợp bước chân theo tuần
router.get("/laydulieutheotuan/:user_id", controler.getWeeklySummary);

// Route láy tổng hợp bước chân theo tháng
router.get("/laydulieutheothang/:user_id", controler.getMonthlySummary)

module.exports= router