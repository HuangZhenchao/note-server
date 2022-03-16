const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $config = require('../config');
const {dateFormat, dateStr} = require('../common/function');
const formidable = require('formidable');
const fs = require("fs");
const crypto = require('crypto');
const async = require("async");
// 使用连接池，提升性能
const pool = mysql.createPool($config.db);

const imgType=['image/jpg','image/jpeg','image/png','image/gif'];
const imgTypeExt=['.jpg','.jpeg','.png','.gif']
const getExtName=function (path) {

}

function uploadFiles(res,files) {
    //const fileName=req.fields.filename;
    //let files=req.files.file;
    let succesItem=[];
    let errItem=[]
    async.map(files,function (file,callback){
        //console.log(file)
        //const newPath='http://localhost:5382/upload/image/'+file.newFilename
        if(file.size<=0){
            errItem.push({code:1,path:newFilename})
            callback(null, {code:1,path:newFilename})
            fs.unlink(file.filepath,()=>{})
            return;
        }
        //支持图片上传的格式。
        //var imgType="image/jpg;image/jpeg;image/png;image/gif";
        //console.log(file.type,imgType.includes(file.mimetype))
        if(!imgType.includes(file.mimetype)){
            errItem.push({code:2,path:newFilename})
            callback(null, {code:2,path:newFilename})
            fs.unlink(file.filepath,()=>{})
            return;
        }
        const h = crypto.createHash('md5');

        h.update(fs.readFileSync(file.filepath));

        let ret = h.digest('hex');
        let newFilePath='upload/image/'+ret+imgTypeExt[imgType.indexOf(file.mimetype)]
        fs.access(newFilePath,fs.constants.F_OK,(err)=>{
            err?fs.rename(file.filepath,newFilePath,()=>{}):fs.unlink(file.filepath,()=>{})
        })
        succesItem.push($config.domain+newFilePath)
        callback(null, {code:0,path:$config.domain+newFilePath})

    },function (err,results) {        
        res.json({
            code:0,//上传成功啦
            data:succesItem.join(';'),
            msg:errItem
        })
    })
}

module.exports = function(app) {
    app.post('/api/upload/image', function (req, res, next) {

        const formidableOptions={
            encoding:'utf-8',       //设置编辑
            uploadDir:"./upload/image",   //设置上传目录
            multiples:true,         //多文件上传
            keepExtensions:true     //保留后缀
        }
        const form=new formidable.IncomingForm(formidableOptions);
        form.parse(req, (err, fields, files) => {
            console.log(err,files)
            files=files.file
            if(files instanceof Array) {
                uploadFiles(res,files)
            }else{
                files=[files]
                uploadFiles(res,files)
            }
        })
    });
}