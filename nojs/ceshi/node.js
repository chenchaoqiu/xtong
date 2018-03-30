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
// console.log(ll1)
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
//
// console.log("准备打开已存在的文件！");
// fs.open('router.js', 'r+', function(err, fd) {
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
//
//         // 仅输出读取的字节
//         if(bytes > 0){
//             console.log(buf.slice(0, bytes).toString());
//         }
//
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
//
// var postHTML =
//   '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
//   '<body>' +
//   '<form method="post">' +
//   '网站名： <input name="name"><br>' +
//   '网站 URL： <input name="url"><br>' +
//   '<input type="submit">' +
//   '</form>' +
//   '</body></html>';
//
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
//
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

// const fs = require('fs')
// const server = require('http').createServer()
// server.on('request', (req, res) => {
//     fs.readFile('./ll.txt', (err, result)=>{
//         if(err){
//             throw err
//         }
//         res.end(result)
//     })
// })
// server.listen(3000)

// const fs = require('fs')
// const server = require('http').createServer()
// server.on('request', (req, res) => {
//     let data = fs.createReadStream('./ll.txt')
//     data.pipe(res)
// })
// server.listen(3000)

/*小文件拷贝*/
var fs = require('fs');
var path=require('path');


/*复制目录所有文件，包括子目录*/
var stat = fs.stat;
var copy = function( src, dst, arr ){
    // 读取目录中的所有文件/目录
    fs.readdir( src, function( err, paths ){
        if( err ){
            throw err;
        }
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
                    if(arr.indexOf(path)<0){
                    // 创建读取流
                    readable = fs.createReadStream( _src );
                    // 创建写入流
                    writable = fs.createWriteStream( _dst );
                    // 通过管道来传输流
                    readable.pipe( writable );
                    }
                }
                // 如果是目录则递归调用自身
                else if( st.isDirectory() ){
                    exists( _src, _dst, arr, copy );
                }
            });
        });
    });
};
// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var exists = function( src, dst, arr, callback ){
    fs.exists( dst, function( exists ){
        // 已存在
        if( exists ){
            callback( src, dst, arr );
        }
        // 不存在
        else{
            fs.mkdir( dst, function(){
                callback( src, dst, arr );
            });
        }
    });
};
    exists( 'F:\\wamp\\www\\imei-1\\webpage\\app\\active\\codeTooKeen_20180307', 'F:\\wamp\\www\\imei-1\\webpage\\app\\active\\codeTooKeen_20180308',[
        'im.css'
    ], copy );


'use strict'

const Excel = require('exceljs')
const _ = require('lodash')

function cellToString (cell) {
    if (_.isDate(cell)) {
        return cell.toISOString()
    } else if (_.isBoolean(cell)) {
        return `${cell}`
    } else if (_.isObject(cell) && _.isArray(cell.richText)) {
        return cell.richText.map((ele) => {
            return cellToString(ele.text)
        }).join('')
    } else if (_.isObject(cell) && _.isObject(cell.text)) {
        return cellToString(cell.text)
    } else if (_.isObject(cell) && _.isString(cell.text)) {
        return `${cell.text}`
    } else if (_.isString(cell)) {
        return cell
    } else if (_.isNumber(cell)) {
        return `${cell}`
    } else if (_.isUndefined(cell) || _.isNull(cell)) {
        return ''
    } else {
        throw new Error(`unknown type ${cell.constructor.name}`)
    }
}

class ExcelParser {
    constructor (data, rule, limit) {
        this.rule = rule
        this.data = data
        this.limit = limit
        this.headerline = 2
        this.rows = []
        this.hasParsed = false
        this.hastoArray = false
        this.jsonArray = []
    }

    setHeaderline (headerline) {
        this.headerline = headerline
    }

    get isExccedLimit () {
        return this.rows.length > this.limit
    }

    parse () {
        if (this.hasParsed) return this.rows
        let workbook = new Excel.Workbook()
        return new Promise((resolve, reject) => {
            workbook.xlsx.load(this.data).then((data) => {
                let worksheet = data.getWorksheet(1)
                this.rows = worksheet.getSheetValues()

                // the first row include(A,B,C,D...), its useless
                this.rows = _.drop(this.rows, this.headerline + 1)
                this.hasParsed = true
                this.rows = this.rows.map((row) => {
                    return row.map((cell) => {
                        return cellToString(cell)
                    })
                })
                resolve(this.rows)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    toArray () {
        if (!this.hasParsed) throw new Error('need parse before')
        if (this.hastoArray) return this.jsonArray
        for (let index = 0; index < this.rows.length; index++) {
            let row = this.rows[index]
            // Remove the serial number of the first column of each row
            row = _.drop(row, 1)
            let _data = {}
            for (let index = 0; index < this.rule.length; index++) {
                const rule = this.rule[index]
                _data[rule] = row[index] || ''
            }
            if (_.compact(_.values(_data)).length !== 0) {
                this.jsonArray.push(_data)
            }
        }
        this.hastoArray = true
        return this.jsonArray
    }
}

module.exports = ExcelParser