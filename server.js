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
const path = require('path')




var routerUser = require('./app/router/user.router')
app.use('/api/user', routerUser)

var routerGift = require('./app/router/gift.router')
app.use('/api/gift', routerGift)

var routerFile = require("./app/router/file.router");
app.use("/api", routerFile);

app.use("/", express.static(path.join("./app/public")));
app.use("/uploads", express.static(path.join("./app/public")));

app.listen(3002, () => {
  console.log(`link: http://localhost:${3002}`)
})