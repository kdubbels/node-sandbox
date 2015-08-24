/*jslint node: true */
'use strict';

/*
logs "not authorized" on odd numbered minutes and
the "secret info" on even numbered minutes
*/

var express = require("express");
var http = require("http");
var app = express();


http.createServer(app).listen(3000);

app.use(function (request, response, next) {
    console.log("In comes a " + request.method + " to " + request.url);
    next();
});

app.use(function(request, response, next) {
	var minute = (new Date()).getMinutes();
	if ((minute % 2) === 0) {
	next();
	} else {
	response.statusCode = 403;
	response.end("Not authorized.");
	console.trace();
	}
});

app.use(function(request, response) {
	response.end('Secret info: the password is "swordfish"!');
	console.trace();
});