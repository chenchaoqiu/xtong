module.exports = function (app,mysql,urlencodedParser) {
    var MongoClient = require('mongodb').MongoClient;
    var DB_CONN_STR = 'mongodb://localhost:27017/runoob'; // 数据库为 runoob

    /*这个是链接MySQL数据库*/
   /* var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'mysql',
        debug:true
    });
    connection.connect();
    app.get('/mysql_db', function (req, res) {
        var response = {
            "first_name":req.query.first_name,
            "last_name":req.query.last_name
        };
        connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
            if (error) {console.log(error)};
            console.log('The solution is: ', results[0].solution);
            res.end(JSON.stringify(results));
        });
        /!*结束数据库*!/
        connection.end();
    })*/


   /*插入数据库*/
   app.get('/mongodbset',function (req, res) {

       var insertData = function(db, callback) {
           //连接到表 site
           var collection = db.collection('site');
           //插入数据
           var data = [{"name":"菜鸟教程","url":"www.runoob.com"},{"name":"菜鸟工具","url":"c.runoob.com"}];
           collection.insert(data, function(err, result) {
               if(err)
               {
                   console.log('Error:'+ err);
                   return;
               }
               console.log('加入成功！')
               callback(result);
           });
       }

       /*链接数据库*/
       MongoClient.connect(DB_CONN_STR, function(err, db) {
           console.log("连接成功！");
           insertData(db, function(result) {
               console.log(result);
               db.close();
               res.end(JSON.stringify(result));
           });
       });
   });

   /*查询数据库*/
   app.get('/mongodbget',function (req, res) {
       var selectData = function(db, callback) {
           //连接到表
           var collection = db.collection('site');
           //查询数据
           var whereStr = {"name":'菜鸟教程'};
           collection.find(whereStr).toArray(function(err, result) {
               if(err)
               {
                   console.log('Error:'+ err);
                   return;
               }
               callback(result);
           });
       }

       /*链接数据库*/
       MongoClient.connect(DB_CONN_STR, function(err, db) {
           console.log("连接成功！");
           selectData(db, function(result) {
               console.log(result);
               db.close();
               res.end(JSON.stringify(result));
           });
       });
   });

   /*更新数据库*/
   app.get('/mongodbnews',function (req, res) {
       var updateData = function(db, callback) {
           //连接到表
           var collection = db.collection('site');
           //更新数据
           var whereStr = {"name":'菜鸟教程'};
           var updateStr = {$set: { "url" : "https://www.runoob.com" }};
           collection.update(whereStr,updateStr, function(err, result) {
               if(err)
               {
                   console.log('Error:'+ err);
                   return;
               }
               callback(result);
           });
       }

       MongoClient.connect(DB_CONN_STR, function(err, db) {
           console.log("连接成功！");
           updateData(db, function(result) {
               // console.log(result.result.n);
               db.close();
               res.end(JSON.stringify(result));
           });
       });
   });

   /*删除数据库*/
   app.get('/mongodbDelete',function (req, res) {
       var delData = function(db, callback) {
           //连接到表
           var collection = db.collection('site');
           //删除数据
           var whereStr = {"name":'菜鸟教程'};
           collection.remove(whereStr, function(err, result) {
               if(err)
               {
                   console.log('Error:'+ err);
                   return;
               }
               callback(result);
           });
       }

       MongoClient.connect(DB_CONN_STR, function(err, db) {
           console.log("连接成功！");
           delData(db, function(result) {
               console.log(result);
               db.close();
               res.end(JSON.stringify(result));
           });
       });
   })
};