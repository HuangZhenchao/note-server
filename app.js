const express = require('express')
const app = express()
const path = require('path') 
const port = 8002
var bodyParser = require('body-parser');
var routes=require('./routes')
const formidableMiddleware = require('express-formidable');
const history = require('connect-history-api-fallback')
app.use('/', history());
app.use('/upload',express.static(path.join(__dirname, './upload')))
app.use('/public',express.static(path.join(__dirname, './public/')))
app.use(express.static(path.join(__dirname, './dist')))
// 解析 application/json
app.use(bodyParser.json()); 
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());


//app.use(formidableMiddleware(options,events))

routes(app);


app.listen(port, () => console.log(`监听端口： ${port}!`))