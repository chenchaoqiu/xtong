var express = require('express');
var upload = require('multer')({ dest: 'uploads/' });
var app = express();
var fs = require('fs');
var mysql = require('mysql');
var formidable = require('formidable');
var formParse=new formidable.IncomingForm();

/*打开静态文件夹或文件*/
app.use(express.static('./nojs/view/public'));

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

app.post('/message', urlencodedParser, function (req,resp) {
    formParse.uploadDir='./';//缓存地址
    formParse.multiples=true;//设置为多文件上传
    formParse.keepExtensions=true;//是否包含文件后缀
    //文件都将保存在files数组中
    var files=[],size=0;
    formParse.on('file', function (filed,file) {
        files.push([filed,file]);
    })
    formParse.parse(req,function(error,fields,files) {
        if (error) {
            console.log("error" + error.message);
            return;
        }
        size++;
        if(size==1&&files.uuu.length!=undefined){
            //files.uuu[k]里保存着用户所上传的文件
            for(var k=0;k<files.uuu.length;k++){
                var fileName=files.uuu[k].name;
                /*修改文件名称*/
                // var fileUrl= __dirname + "/" +fileName.split('.')[0]+new Date().getTime()+'.'+fileName.split('.')[1];
                var fileUrl=__dirname + "/" +new Date().getTime()+fileName;
                fs.renameSync(files.uuu[k].path,fileUrl);
            }
            files=[];
        }else if(size==1&&files.uuu.name!=''){
            var fileUrl=__dirname + "/" +new Date().getTime()+files.uuu.name;
            fs.renameSync(files.uuu.path,fileUrl);
        }
        resp.end('55')
        return;
    });
});
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

//操作本地文件
var file=require('./File/file.js')(app,fs);

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
})

/*引入cookie*/
var cookieParser = require('cookie-parser');

/*cookies 管理*/
app.use(cookieParser());
app.get('/COO', function(req, res) {
    req.cookies.sle='lsjei';
    console.log("Cookies: ", req.cookies);
})


var server = app.listen(8081, function () {
/*配置服务器*/
    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})