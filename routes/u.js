var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $config = require('../config');
var {dateFormat,dateStr}=require('../common/function')

// 使用连接池，提升性能
var pool  = mysql.createPool($config.db);
const formidable = require('formidable');
const fs = require("fs");
const path=require("path")
var mkdirp = require('mkdirp')
module.exports = function(app) {
    app.post('/api/u/cnote', function (req, res, next) {
        const form=new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            
            let filePath=fields.filePath
            let content=fields.content
            console.log("/api/u/cnote",filePath)
            // 同步读取
            //var data = fs.readFileSync(filePath);
            // 异步读取
            fs.writeFile(filePath,content,function(err){
                if(err) {
                    console.log("异步写入: " + err);
                    res.json({
                        code:1,
                        msg:'错误信息',
                        data:{}
                    });
                } else {
                    res.json({
                        code:0,
                        data:{}
                    });
                }
            })    
        })
        
        
    });
    app.post('/api/u/notehtml', function (req, res, next) {
        const form=new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            //console.log(fields)
            let filePath=fields.filePath
            filePath=filePath+".html"
            filePath=filePath.replace("upload/cnote","upload/notehtml")
            filePath=filePath.replace("upload\\cnote","upload\\notehtml")
            
            let content=fields.content
            var pretty = require('pretty');
            content=pretty(content, {ocd: true});
            mkdirp(path.dirname(filePath))
            console.log("/api/u/notehtml",filePath)
            // 同步读取
            //var data = fs.readFileSync(filePath);
            // 异步读取
            fs.writeFile(filePath,content,function(err){
                if(err) {
                    console.log("异步写入: " + err);
                    res.json({
                        code:1,
                        msg:'错误信息',
                        data:{}
                    });
                } else {
                    res.json({
                        code:0,
                        data:{}
                    });
                }
            })

        })
        
        
    });
    app.post('/api/u/style', function (req, res, next) {
        const form=new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            //console.log(fields)
            let filePath="upload\\textbus.component.style.css" 
            
            let content=fields.content
            var pretty = require('pretty');
            content=pretty(content, {ocd: true});
            
            console.log("/api/u/style",filePath)
            // 同步读取
            //var data = fs.readFileSync(filePath);
            // 异步读取
            fs.writeFile(filePath,content,function(err){
                if(err) {
                    console.log("异步写入: " + err);
                    res.json({
                        code:1,
                        msg:'错误信息',
                        data:{}
                    });
                } else {
                    res.json({
                        code:0,
                        data:{}
                    });
                }
            })

        })        
    });
}