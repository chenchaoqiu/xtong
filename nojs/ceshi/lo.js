// function Hello() {
//     var name;
//     this.setName = function(thyName) {
//         name = thyName;
//     };
//     this.sayHello = function() {
//         console.log('Hello ' + name);
//     };
// };
// module.exports = Hello;


var http=require('http');
var url=require('url');

function stati(){
    function onstall(r,w){
        var pathname=url.parse(r.url).pathname;
        console.log('request for'+ pathname + ' received.');
        w.writeHead(200,{"Content-Type":"text/plain"});
        w.write('Howlein lseif');
        w.end();
    }
    http.createServer(onstall).listen(8888);
    console.log('结束1');
}
exports.stati = stati;
