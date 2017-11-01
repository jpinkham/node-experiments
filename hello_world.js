var listen_port = 9090;

// requiring the HTTP interfaces in node
var http = require('http');

// create an http server to handle requests and response
http.createServer(function (req, res) {

  // sending a response header of 200 OK
  res.writeHead(200, {'Content-Type': 'text/plain'});

  // print out Hello World
  res.end('Hello World, lookout here i come!\n');

// set port to listen on 
}).listen(listen_port);


console.log('Jennifer, the server is running on port ' , listen_port);
