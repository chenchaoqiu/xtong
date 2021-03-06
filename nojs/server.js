﻿var express = require('express');
var upload = require('multer')({ dest: 'uploads/' });
var app = express();
var fs = require('fs');
var mysql = require('mysql');
var opn=require('opn');
var request = require('request');
// const csrf = request('csurf');/*防止csurf攻击*/
/*引入cookie*/
var cookieParser = require('cookie-parser');
// var csrfProtection = csrf({ cookie: true })
app.use(cookieParser());

/*lodash开始*/
//加载完整版本。
var _ = require('lodash');
// 加载核心构建。
var _ = require('lodash/core');
// 加载FP构建用于不可变的自动编写的iteratee-first数据最后的方法。
var fp = require('lodash/fp');

// 加载方法类别。
var array = require('lodash/array');
var object = require('lodash/fp/object');

// 用于较小的browserify / rollup / webpack bundle的Cherry-pick方法。
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');
/*lodash结束*/



/*打开静态文件夹或文件*/
app.use(express.static(__dirname+'/view/public'));

/*文件上传multer*/
var multer = require('multer');

/*这个body-parser是post提交的前提*/
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析   post
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//连入数据库
var db = require('./data/db/db.js')(app,mysql,urlencodedParser);

// /*配置路由*/
var router = require('./router/router.js')(app);

app.post('/process_post', urlencodedParser, function (req, res) {
    /*post 方式输出输入*/
    var response = {
        "first_name":req.body.first_name,
        "last_name":req.body.last_name
    };
    console.log(response);
    // 输出 JSON 格式
    res.end(JSON.stringify(response));
})

//操作本地文件,文件上传
var file=require('./File/file.js')(app,fs,urlencodedParser,request);

/*上传文件*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));


app.get('/process_get', function (req, res) {
    /*get 方式输出输入*/
    // 输出 JSON 格式
    var response = {
        "first_name":req.query.first_name,
        "last_name":req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
});






app.post('/file_upload', function (req, res) {
    /*上传文件*/
    console.log(req.files[0]);  // 上传的文件信息

    var des_file = __dirname + "/" + req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data){
        fs.writeFile(des_file, data, function (err){
            if( err ){
                console.log( err );
            }else{
                response = {
                    message:'File uploaded successfully',
                    filename:req.files[0].originalname
                };
            }
            console.log( response );
            res.end( JSON.stringify( response ) );
        });
    });
});

/*防止csurf攻击*/
// app.get('/form', csrfProtection, function (req, res) {
//     // pass the csrfToken to the view
//     res.render('send', { csrfToken: req.csrfToken() })
// })
//
// app.post('/process', urlencodedParser, csrfProtection, function (req, res) {
//     res.send('data is being processed')
// })
/*防止csurf攻击结束*/

/*cookies 管理*/
app.get('/COO', function(req, res) {
    req.cookies.sle='lsjei';
    console.log("Cookies: ", req.cookies);
})


var server = app.listen(8081, function () {
/*配置服务器*/
    var host = server.address().address
    var port = server.address().port
    opn('http://localhost:8081');
    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})