const http = require('http');

var porta = process.env.PORT || 8080;

var server = http.createServer(function (req, res){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(“<h1>Seja bem-vindo!</h1>”);
        res.end();
  });
server.listen(porta);