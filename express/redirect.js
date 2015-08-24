var express = require("express");
var path = require("path");
var http = require("http");
var app = express();


app.get("/", function(request, response) {
	response.redirect("/hello/world");
});



http.createServer(app).listen(3000);