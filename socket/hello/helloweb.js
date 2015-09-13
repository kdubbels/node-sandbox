var http = require("http");

http.createServer(function(req, res) {
	res.writeHead(200, {"Content-Type":"text/html"});
	res.write("<html>");
	res.write("<head><title>Node.js</title></head>");
	res.write("<body>Hello world</body>");
	res.write("</html>");
	res.end();
}).listen(9999);