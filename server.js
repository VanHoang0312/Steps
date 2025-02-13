const express = require("express");
var app = express();
const bodyParser = require('body-parser');
var cors = require("cors");
const { db_connect } = require("./app/configs/db.configs");
db_connect();
var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.json()); // để xử lý dạng dữ liệu json
app.use(express.urlencoded({ extended: true })); // để xử lý dữ liệu url encoded
app.use(cors({ credentials: true, origin: "*" })); // chấp thuận cors từ mọi 







var routerUser = require('./app/router/user.router')
app.use('/api/user', routerUser)

var routerDailyactivity = require('./app/router/dailyactivity.router')
app.use('/api/dailyactivity', routerDailyactivity)

var routerGoals = require('./app/router/goals.router')
app.use('/api/goal', routerGoals)

var routerNotifications = require('./app/router/notifications.router')
app.use('/api/notifications', routerNotifications)

var routerWorkout = require('./app/router/workout.router')
app.use('/api/workout', routerWorkout)


app.listen(3002, () => {
  console.log(`link: http://localhost:${3002}`)
})