var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $config = require('../config');
var {dateFormat,dateStr}=require('../common/function')
// 使用连接池，提升性能
var pool  = mysql.createPool( $config.db);
module.exports = function(app) {
    app.post('/api/d/record', function (req, res, next) {

    });
}