module.exports = function (app,fs,urlencodedParser,request) {
    /*上传文件
    * 整合ajax，form上传，可以兼容ie所有，也可以兼容ie10以上的筛选；
    * * */
    var url='';
    function loadfileImg(e) {
        /*找到新建的图片images路径*/
        url='imei-1/webpage/app/active/'+e+'/images/';
    }

    app.post('/ajaxfile', urlencodedParser, function (request,response) {
        if(url==''){
            response.end('请选择链接最后路径名称！');
            return;
        }
        var formidable = require('formidable');
        var formParse=new formidable.IncomingForm();
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
                                var fileUrl=__dirname + "/../../../../"+url +files[k][i].name;
                                fs.rename(files[k][i].path,fileUrl);
                            }else{
                                var fileUrl=__dirname + "/../../../../"+url +files[k].name;
                                fs.rename(files[k].path,fileUrl);
                                return;
                            }
                        }
                    }
                    files[k]=''
                }
            },1000);
            response.end('成功');
        });
    });

    app.post('/fromfile', urlencodedParser, function (req,resp) {
        var formidable = require('formidable');
        var formParse=new formidable.IncomingForm();
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
        var url1='F:\\wamp\\www\\imei-1\\webpage\\app\\active\\'+req.query.ur+'\\package.json';
        fs.readFile(url1,'utf8',function (err, data) {
            res.end(data);
        });
    });

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


    /*-----------------------------------------------文件夹操作-----------------------------------------------------*/


    app.post('/New_project', urlencodedParser, function (req, res) {
        /*post 方式输出输入* */
        var fripo='F:\\wamp\\www\\imei-1\\webpage\\app\\active\\mb';/*模范*/
        var posi='F:\\wamp\\www\\imei-1\\webpage\\app\\active\\';/*保存路径*/
        var mul=JSON.parse(req.body.pro).mul;
        mkdir(posi+mul);/*创建目录*/
        exists( fripo, posi+mul, copy );/*复制文件*/
        fs.readFile(__dirname + "/" + "../view/conlog.txt", 'utf8', function (err, data) {
            data =data.split(',');
            if(data.indexOf(mul)<0){
                writeFile(__dirname + "/" + "../view/conlog.txt",','+mul,'a',function (e) {});/*写入json文件*/
            }
        });

        var dir=(posi+mul+'\\package.json');
        setTimeout(function () {
            loadfileImg(mul);
            writeFile(dir,req.body.pro,'w',function (e) {
                if(e){
                    res.end('200');
                }
            });/*写入json文件*/
        },1000)
        // 输出 JSON 格式
    });

    //写入文件
    function writeFile(cur,pro,q,callback) {
        /*
         * flag：文件的操作情况，r表示这个文件只读，w表示写入文件，a追加文件（常用的三个）
         *encoding:读取文件用的编码，utf-8，base64，ascii我们不指定编码，那么返回的data为一个buffer
         * */
        fs.writeFile(cur,pro,{flag:q,encoding:'utf-8',mode:'0666'},function(err){/**/
            if(err){
                callback(false);
                console.log("文件写入失败")
            }else{
                callback(true);
                console.log("文件写入成功");

            }

        })
    }

    //创建文件夹
    // const fs=require('fs');
    function mkdir(currentDir) {
        fs.exists(currentDir,function(exists){
            if(!exists){
                fs.mkdir(currentDir,'0777',function(err){
                    if(err){
                        console.log('创建文件夹出错！'+err);
                    }else{
                        console.log(currentDir+'文件夹-创建成功！');
                    }
                });
            }else{
                console.log(currentDir+'文件夹-已存在！');
            }
        });
    }
    // mkdir('F:\\wamp\\www\\imei-1\\webpage\\app\\active\\codeTooKeen_20180308');

//删除目录
//注：当前删除目录操作，只能删除空目录
//如果目录总有文件，抛出异常 { [Error: ENOTEMPTY, rmdir 'f:\test1'] errno: -4051, code: 'ENOTEMPTY', path: 'f:\\test1' }
    function delrmdir(currentDir) {
        fs.rmdir(currentDir, function(err) {
            if (err) {
                console.log('删除空目录失败，可能原因：1、目录不存在，2、目录不为空')
                return console.error(err);
            }
            console.log('删除目录成功');
        });
    }
// delrmdir('F:\\wamp\\www\\imei-1\\webpage\\app\\active\\codeTooKeen_20180308');

//重命名文件或文件夹
    var path=require('path');
    function rename(old, New) {
        old=path.resolve(old);
        console.info(old);
        New=path.resolve(New);
        fs.rename(old,New,function(err){
            if(err){
                console.error(err);
                return;
            }
            console.log('重命名成功');
        });
    }
// rename('F:\\wamp\\www\\imei-1\\webpage\\app\\active\\codeTooKeen_20180308','F:\\wamp\\www\\imei-1\\webpage\\app\\active\\codeTooKeen_20180309');

/*小文件复制功能*/
    function xcopy(src, dst) {
        fs.createReadStream(src).pipe(fs.createWriteStream(dst));
        console.log('复制成功')
    }

    function main(argv) {
        xcopy(argv[0], argv[1]);
    }

    // main(['F:\\wamp\\www\\imei-1\\webpage\\app\\active\\codeTooKeen_20180307\\index.html','F:\\wamp\\www\\imei-1\\webpage\\app\\active\\codeTooKeen_20180308\\index.html']);

/*复制目录所有文件，包括子目录*/
    var stat = fs.stat;
    var copy = function( src, dst ){
        // 读取目录中的所有文件/目录
        fs.readdir( src, function( err, paths ){
            if( err ){
                throw err;
            }
            // console.log(paths)
            paths.forEach(function( path ){
                var _src = src + '/' + path,
                    _dst = dst + '/' + path,
                    readable, writable;
                stat( _src, function( err, st ){
                    if( err ){
                        throw err;
                    }
                    // 判断是否为文件
                    if( st.isFile() ){
                        // 创建读取流
                        readable = fs.createReadStream( _src );
                        // 创建写入流
                        writable = fs.createWriteStream( _dst );
                        // 通过管道来传输流
                        readable.pipe( writable );
                    }
                    // 如果是目录则递归调用自身
                    else if( st.isDirectory() ){
                        exists( _src, _dst, copy );
                    }
                });
            });
        });
    };
// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
    var exists = function( src, dst, callback ){
        fs.exists( dst, function( exists ){
            // 已存在
            if( exists ){
                callback( src, dst );
            }
            // 不存在
            else{
                fs.mkdir( dst, function(){
                    callback( src, dst );
                });
            }
        });
    };
//     exists( 'F:\\wamp\\www\\imei-1\\webpage\\app\\active\\codeTooKeen_20180307', 'F:\\wamp\\www\\imei-1\\webpage\\app\\active\\codeTooKeen_20180308', copy );
};