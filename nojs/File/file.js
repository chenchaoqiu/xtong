module.exports = function (app,fs) {
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
            "id": 4
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