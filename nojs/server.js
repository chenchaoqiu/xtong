var express = require('express');
var app = express();
var fs = require('fs'); /*文件上传这个也要*/

/*文件上传multer*/
var multer = require('multer');

/*这个body-parser是post提交的前提*/
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析   post
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/*引入cookie*/
var cookieParser = require('cookie-parser');

// /*配置路由*/
var router = require('./router/router.js')(app);


/*打开静态文件夹或文件*/
app.use(express.static('view/public'));

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

/*读取数据*/
app.get('/listuser',function (req, res) {
    fs.readFile(__dirname + '/' + 'json/users.json','utf8',function (err, data) {
        console.log(data);
        res.end(JSON.stringify(data));
    })
})
/*添加数据*/
var user = {
    "user4" : {
        "name" : "mohit",
        "password" : "password4",
        "profession" : "teacher",
        "id": 4
    }
};
app.get('/addUser', function (req, res) {
    // 读取已存在的数据
    fs.readFile( __dirname + "/" + "json/users.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        data["user4"] = user["user4"];
        console.log( data );
        res.end( JSON.stringify(data));
    });
});

/*显示用户详情*/
app.get('/cksl/:id', function (req, res) {
    // 首先我们读取已存在的用户
    fs.readFile( __dirname + "/" + "json/users.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        var user = data["user" + req.params.id]
        console.log( user );
        res.end( JSON.stringify(user));
    });
});

/*删除用户*/
app.get('/deleteUser/:id', function (req, res) {
    fs.readFile( __dirname + "/" + "json/users.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        delete data["user" + req.params.id];
        console.log( data );
        res.end( JSON.stringify(data));
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