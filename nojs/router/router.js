var router = require('../router.js');
module.exports = function (app) {
    /*生成路由*/
    router(app,'/','./view/index.html');
};