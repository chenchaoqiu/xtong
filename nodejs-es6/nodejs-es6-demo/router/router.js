var router = require('../router.js');
module.exports = function (app) {
    /*生成路由*/
    router(app,'/','./view/index.html');
    router(app,'/index','./view/index.html');
    router(app,'/conlog','./view/conlog.txt');
    /*实时聊天*/
    router(app,'/live_chat','./Live_chat/view/index.html');
    /*实时聊天结束*/
};