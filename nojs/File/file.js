module.exports = function (app,fs,urlencodedParser,request) {
    /*上传文件
    * 整合ajax，form上传，可以兼容ie所有，也可以兼容ie10以上的筛选；
    * * */
    var formidable = require('formidable');
    var formParse=new formidable.IncomingForm();
    app.post('/ajaxfile', urlencodedParser, function (request,response) {
        /*ajax 提交的ie10下不支持*/
        formParse.uploadDir='./uploads/';//缓存地址
        formParse.multiples=true;//设置为多文件上传
        formParse.keepExtensions=true;//是否包含文件后缀
        formParse.maxFieldsSize = 50 * 1024 * 1024;
        var size,arry=[];
        formParse.parse(request, function(err, fields, files) {
            clearTimeout(size);
            size=setTimeout(function () {
                for(var k in files){
                    arry.push(k);
                    if(arry.length==1){
                        for(var i in files[k]){
                            if(files[k][i]!=null){
                                var fileUrl=__dirname + '/' + "../uploads/" +new Date().getTime()+files[k][i].name;
                                fs.rename(files[k][i].path,fileUrl);
                            }else{
                                var fileUrl=__dirname + '/' + "../uploads/" +new Date().getTime()+files[k].name;
                                fs.rename(files[k].path,fileUrl);
                                return;
                            }

                        }
                    }
                    files[k]=''
                }
            },1000);
            response.end('true');
        });
    });

    app.post('/fromfile', urlencodedParser, function (req,resp) {
        /*from 提交的浏览器都支持*/
        formParse.uploadDir='./uploads/';//缓存地址
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
                    var fileUrl=__dirname + '/' + "../uploads/" +new Date().getTime()+fileName;
                    console.log(fileUrl)
                    fs.renameSync(files.uuu[k].path,fileUrl);
                }
            }else if(size==1&&files.uuu.name!=''){
                var fileUrl=__dirname + '/' + "../uploads/" +new Date().getTime()+files.uuu.name;
                fs.renameSync(files.uuu.path,fileUrl);
            }
            files=[];
            resp.end('<html><meta http-equiv="content-Type" content="text/html;charset=utf-8"/>' +
                '<script charset="UTF-8">setTimeout(function(){location.href="/"},10)</script>' +
                '</html>')
            return;
        });
    });

    /*-----------------------------------------------上传文件分割线-----------------------------------------------------*/

    /*读取下载文件*/
    var path = require('path');
    app.get('/files', function(req, res, next) {
        // 显示服务器文件
        // 文件目录
        var filePath = path.join(__dirname, '/' + "../uploads/");
        fs.readdir(filePath, function(err, results){
            if(err) {console.log(err)};
            if(results.length>0) {
                var files = [];
                results.forEach(function(file){
                    if(fs.statSync(path.join(filePath, file)).isFile()){
                        files.push(file);
                    }
                })
                // res.render('files', {files:files});
                res.end(JSON.stringify(files))
            } else {
                res.end('当前目录下没有文件');
            }
        });
    });
    /*-----------------------------------------------读取下载文件分割线-----------------------------------------------------*/
    /*从服务器上 下载文件*/
    app.get('/fileXload/:fileName', function(req, res, next) {
        // 实现文件下载
        var fileName = '/' + "../uploads/"+req.params.fileName;
        var filePath = path.join(__dirname, fileName);
        var stats = fs.statSync(filePath);
        if(stats.isFile()){
            res.set({
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': 'attachment; filename='+fileName,
                'Content-Length': stats.size
            });
            fs.createReadStream(filePath).pipe(res);
        } else {
            res.end('404');
        }
    });
    /*从网上 下载文件,只能用异步方式做,用链接方式不可行*/
    app.get('/fileSload',function (req, res) {
        var img_src = req.query.name; //获取图片的url
        console.log(img_src)
        //采用request模块，向服务器发起一次请求，获取图片资源
        request.head(img_src,function(err,res,body){
            if(err){
                console.log(err);
            }
        });

        var img_filename = 'mu.jpg';

        //通过流的方式，把图片写到本地/image目录下，并用新闻的标题和图片的标题作为图片的名称。
        request(img_src).pipe(fs.createWriteStream('G:/'+ img_filename));
        res.end('js')
    })

/*-----------------------------------------------下载文件分割线-----------------------------------------------------*/

    /*读取数据*/
    app.get('/listuser',function (req, res) {
        fs.readFile(__dirname + '/' + '../json/users.json','utf8',function (err, data) {
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
            "id": 5
        }
    };
    app.get('/addUser', function (req, res) {
        // 读取已存在的数据
        fs.readFile( __dirname + "/" + "../json/users.json", 'utf8', function (err, data) {
            data = JSON.parse( data );
            data["user4"] = user["user4"];
            console.log( data );
            res.end( JSON.stringify(data));
        });
    });

    /*显示用户详情*/
    app.get('/cksl/:id', function (req, res) {
        // 首先我们读取已存在的用户
        fs.readFile( __dirname + "/" + "../json/users.json", 'utf8', function (err, data) {
            data = JSON.parse( data );
            var user = data["user" + req.params.id]
            console.log( user );
            res.end( JSON.stringify(user));
        });
    });

    /*删除用户*/
    app.get('/deleteUser/:id', function (req, res) {
        fs.readFile( __dirname + "/" + "../json/users.json", 'utf8', function (err, data) {
            data = JSON.parse( data );
            delete data["user" + req.params.id];
            console.log( data );
            res.end( JSON.stringify(data));
        });
    });
};