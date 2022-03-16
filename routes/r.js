var express = require('express');
var router = express.Router();
var async = require('async');
var mysql = require('mysql');
var $config = require('../config');
const fs = require("fs");
const path=require("path")
var {dateFormat,dateStr}=require('../common/function')
// 使用连接池，提升性能
var pool  = mysql.createPool( $config.db);
const formidable = require('formidable');
module.exports = function(app) {
    app.post('/api/r/folders', function (req, res, next) {
        const form=new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            console.log('/api/r/folders',fields)
            let filePath=fields.filePath||'upload/json'
            let hasChildFolder=function(dir){
                let suns = fs.readdirSync(dir);
                let flag=false
                suns.forEach(function (item, index) {
                    let fPath = path.join(dir,item);
                    let stat = fs.statSync(fPath);
                    if(stat.isDirectory() === true) {
                        flag=true;
                    }
                });
                return flag
            }
            let children = fs.readdirSync(filePath);
            
            let folderList=[]
            children.forEach( (item, index)=> {
                
                let fPath = path.join(filePath,item);
                
                let stat = fs.statSync(fPath);
                
                if(stat.isDirectory() === true) {
                    
                    let folderInfo={
                        name:item,
                        value:fPath,
                        leaf:!hasChildFolder(fPath)
                    }
                    folderList.push(folderInfo)
                    console.log('item',fPath)
                }
            });
            console.log('/api/r/folders',folderList)
            res.json({
                code:0,
                data:folderList
            });
            
        })
        
        
    });
    app.post('/api/r/files', function (req, res, next) {
        const form=new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            console.log(fields)
            let filePath=fields.filePath||'upload/json'
            
            let children = fs.readdirSync(filePath);
            
            let fileList=[]
            children.forEach( (item, index)=> {
                let fPath = path.join(filePath,item);
                let stat = fs.statSync(fPath);
                
                if(stat.isFile() === true) {
                    let fileInfo={
                        name:item,
                        value:fPath
                    }
                    let extname=path.extname(fPath)
                    extname==".cnote"?fileList.push(fileInfo):""
                }
            });
            console.log('/api/r/files',fileList)
            res.json({
                code:0,
                data:fileList
            });
            
        })
    });
    app.post('/api/r/cnote', function (req, res, next) {
        const form=new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            
            let filePath=fields.filePath||'public/json/article.json'
            console.log("/api/r/cnote",filePath)
            let fileType=path.extname(filePath)
            if(!(fileType===".cnote")){
                res.json({
                    code:2,
                    msg:'格式不支持',
                    content:{}
                });
            }
            // 同步读取
            //var data = fs.readFileSync(filePath);
            // 异步读取
            fs.readFile(filePath, 'utf8',function (err, data) {
                //console.log(fileType,err,data.toString())
                if(err) {
                    console.log("异步读取: " + err);
                    res.json({
                        code:1,
                        msg:'错误信息',
                        content:{}
                    });
                } else {
                    res.json({
                        code:0,
                        type:fileType,
                        content:data.toString()
                    });
                }
                
            });
        })
        
        
    });
}