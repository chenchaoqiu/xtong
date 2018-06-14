var express = require('express');
var upload = require('multer')({ dest: 'uploads/' });
var app = express();
var fs = require('fs');
var opn=require('opn');
var request = require('request');

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


// /*设置反代理proxyMiddleWare。，proxyPath，proxyOption*/
var proxyMiddleWare = require("http-proxy-middleware");
/*设置反代理地址('/discern'完全可以写成'/'就是说所有路由都可以访问)*/
app.use('/', proxyMiddleWare({
    target: "http://caoq.com/app/active",//目标后端服务地址(公司同事电脑地址)
    changeOrigin: true
}));

var server = app.listen(9782, function () {
    /*配置服务器*/
    var host = server.address().address
    var port = server.address().port
    // opn('http://localhost:9782');
    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})