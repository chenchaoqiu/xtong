var router = require('../router.js');
module.exports = function (app) {
    /*生成路由*/
    router(app,'/','./view/index.html');
    router(app,'/index','./view/index.html');
    router(app,'/conlog','./view/conlog.txt');
};