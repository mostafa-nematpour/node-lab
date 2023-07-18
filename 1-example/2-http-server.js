var http = require('http');
var server = http.createServer(function (req, res) {

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("hello");
    res.end();

});
server.listen(5000);
console.log("Server are running ...");
