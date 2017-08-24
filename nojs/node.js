// var http = require('http');
//
// http.createServer(function(request,response){
//     response.writeHead(200,{'Content':'text/plain'});
//     response.end('hosneoih');
//     console.log('2%d2',45)
// }).listen(8880);
//
// console.log('http://127.0.0.1:8880/');

// var fs=require("fs");
// var data=fs.readFileSync('ll.txt');
// console.log(data.toString());
// console.log('dkk');

// var fs=require('fs');
// console.log(fs)
// fs.readFile('ll.txt',function(err,data){
//     if(err) return console.log(err);
//     console.log(data.toString())
// });

// var buf = new Buffer('www.runoob.com');
// var json = buf.toJSON(buf);
//
// console.log(json);

// var fs=require('fs');
// var data='你好啊！',data1='';
// /*写入数据*/
// var ll=fs.createWriteStream('ll.txt');
// /*读取数据*/
// var ll1=fs.createReadStream('ll.txt');
// /*写入数据加编码*/
// ll.write(data,'UTF8');
// /*标记文件末尾*/
// ll.end();
//
// ll.on('finish',function(){
//     console.log('写入完成！');
// });
//
// ll.on('error',function(err){
//     console.log(err.stack);
// });
// /*读取数据编码*/
// ll1.setEncoding('UTF8');
// /*读出来的数据*/
// ll1.on('data',function(chunk){
//     data1+=chunk;
// });
// /*读取完成以后，输出数据*/
// ll1.on('end',function(){
//     console.log(data1);
//     console.log('读写完成！')
// });
// ll1.on('error',function(err){
//     console.log(err.stack);
// });
//
// ll1.pipe(ll);  /*读取 input.txt 文件内容，并将内容写入到 input.txt 文件中*/
//
// console.log('程序运行完毕！');


// var fs=require('fs');
// var zlib=require('zlib');
// /*压缩ll.txt文件为 ll.txt.gz*/
// fs.createReadStream('ll.txt.gz').setEncoding('UTF8').pipe(zlib.createGzip()).pipe(fs.createWriteStream('ll1.txt'));
// console.log('压缩完成！');

/*模块化*/
// var lo=require('./lo');
// hello = new lo();
// hello.setName('2');
// hello.sayHello();

// var lo=require('./lo');
// var lo1=require('./lo1');
//
// lo.stati(lo1.route)

// console.info("程序开始执行：");
//
// var counter = 10;
// console.log("计数: %d", counter);
//
// console.time("获取数据");
// //
// // 执行一些代码
// //
// console.timeEnd('获取数据');
//
// console.info("程序执行完毕。")

/*打开文件*/
// var fs = require("fs");
//
// console.log("准备打开文件！");
// fs.stat('ll.txt', function (err, stats) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log(stats);
//     console.log("读取文件信息成功！");
//
//     // 检测文件类型
//     console.log("是否为文件(isFile) ? " + stats.isFile());
//     console.log("是否为目录(isDirectory) ? " + stats.isDirectory());
// });
/*打开文件结束*/

/*写入文件*/
    // var fs = require("fs");

    // console.log("准备写入文件");
    // fs.writeFile('ll.txt', '我是通过写入的文件内容！',  function(err) {
    //     if (err) {
    //         return console.error(err);
    //     }
    //     console.log("数据写入成功！");
    //     console.log("--------我是分割线-------------")
    //     console.log("读取写入的数据！");
    //     fs.readFile('ll.txt', function (err, data) {
    //         if (err) {
    //             return console.error(err);
    //         }
    //         console.log("异步读取文件数据: " + data.toString());
    //     });
    // });
// var fs = require("fs");

// console.log("准备写入文件");
// fs.writeFile('ll.txt', '我是通过写入的文件内容！',  function(err) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log("数据写入成功！");
//     console.log("--------我是分割线-------------")
//     console.log("读取写入的数据！");
//     fs.readFile('ll.txt', function (err, data) {
//         if (err) {
//             return console.error(err);
//         }
//         console.log("异步读取文件数据: " + data.toString());
//     });
// });
/*写入文件结束*/

/*打开文件读取数据*/
// var fs = require("fs");
// var buf = new Buffer(1024);

// console.log("准备打开已存在的文件！");
// fs.open('ll.txt', 'r+', function(err, fd) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log("文件打开成功！");
//     console.log("准备读取文件：");
//     fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
//         if (err){
//             console.log(err);
//         }
//         console.log(bytes + "  字节被读取");

//         // 仅输出读取的字节
//         if(bytes > 0){
//             console.log(buf.slice(0, bytes).toString());
//         }

//         // 关闭文件
//         fs.close(fd, function(err){
//             if (err){
//                 console.log(err);
//             }
//             console.log("文件关闭成功");
//         });
//     });
// });
/*打开文件读取数据结束*/
// var http = require('http');
// var querystring = require('querystring');
// var util = require('util');
 
// var postHTML = 
//   '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
//   '<body>' +
//   '<form method="post">' +
//   '网站名： <input name="name"><br>' +
//   '网站 URL： <input name="url"><br>' +
//   '<input type="submit">' +
//   '</form>' +
//   '</body></html>';
 
// http.createServer(function (req, res) {
//   var body = "";
//   req.on('data', function (chunk) {
//     body += chunk;
//   });
//   req.on('end', function () {
//     // 解析参数
//     body = querystring.parse(body);
//     console.log(body);
//     // 设置响应头部信息及编码
//     res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
 
//     if(body.name && body.url) { // 输出提交的数据
//         res.write("网站名：" + body.name);
//         res.write("<br>");
//         res.write("网站 URL：" + body.url);
//     } else {  // 输出表单
//         res.write(postHTML);
//     }
//     res.end();
//   });
// }).listen(3000);