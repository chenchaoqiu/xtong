function add(app, a, b) {
    app.get(a, function (req, res) {
        res.sendFile( __dirname + '/' + b );
    })
}
module.exports = add;