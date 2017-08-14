var router = require('../router.js');
module.exports = function (app) {
    /*生成路由*/
    router(app,'/','./view/index.html');
    router(app,'/index.html','./view/index.html');
    router(app,'/file','./view/file.html');
    router(app,'/answer','./view/Answer.html');
    router(app,'/share','./view/richScan.html');
};