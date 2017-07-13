var express = require('express');
var app = express();
var fs = require('fs'); /*文件上传这个也要*/
/*文件上传multer*/
var multer = require('multer');
/*这个body-parser是post提交的前提*/
var bodyParser = require('body-parser');


// 创建 application/x-www-form-urlencoded 编码解析   post
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/*打开静态文件夹或文件*/
app.use(express.static('public'));

/*上传文件*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));

app.get('/index.htm', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/process_get', function (req, res) {
    /*get 方式输出输入*/
    // 输出 JSON 格式
    var response = {
        "first_name":req.query.first_name,
        "last_name":req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

app.post('/process_post', urlencodedParser, function (req, res) {
    /*post 方式输出输入*/
    // 输出 JSON 格式
    var response = {
        "first_name":req.body.first_name,
        "last_name":req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

app.post('/file_upload', function (req, res) {
    /*上传文件*/
    console.log(req.files[0]);  // 上传的文件信息

    var des_file = __dirname + "/" + req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
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
})

var server = app.listen(8081, function () {
/*配置服务器*/
    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})