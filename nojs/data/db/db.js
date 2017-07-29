module.exports = function (app,mysql,urlencodedParser) {
    var connection = mysql.createConnection({
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
        /*结束数据库*/
        connection.end();
    })
};