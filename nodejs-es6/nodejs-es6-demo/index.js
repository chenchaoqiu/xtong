import express from 'express';

import fs from 'fs';
import request from 'request';
const app = express();


/*这个body-parser是post提交的前提*/
import bodyParser from 'body-parser';

// 创建 application/x-www-form-urlencoded 编码解析   post
const urlencodedParser = bodyParser.urlencoded({ extended: false });

/*打开静态文件夹或文件*/
app.use(express.static(__dirname+'/view/public'));

// /*配置路由*/
const router = require('./router/router.js')(app);

//操作本地文件,文件上传
const file=require('./File/file.js')(app,fs,urlencodedParser,request);

const http = require('http').Server(app), httpProxy = require('http-proxy');

/*实时聊天*/
/*打开静态文件夹或文件*/
app.use(express.static(__dirname+'/Live_chat'));

const io = require('socket.io')(http);
const Live_chats=require('./Live_chat/index.js')(io);
/*实时聊天结束*/



// /*设置反代理proxyMiddleWare。，proxyPath，proxyOption*/
const proxyMiddleWare = require("http-proxy-middleware");
/*/!*设置反代理地址('/discern'完全可以写成'/'就是说所有路由都可以访问)*!/*/
app.use('/active', proxyMiddleWare({
    target: "http://chaoq.com/app",//目标后端服务地址(公司同事电脑地址)
    changeOrigin: true
}));
http.listen(9784, function () {
    console.log('Example app listening on port 9784!')
})