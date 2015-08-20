var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
	res.render('default', {title: 'Home',
	users: ['Kristofer', 'Kaitlin', 'Pikachu']
	});
});

app.get('/me', function(req, res) {
	res.send('@dubbelsyrfun');
});

app.get('/who/:name?', function(req, res) {
	var name = req.params.name;
	res.send(name + ' was here');
});

app.get('/who/:name?/:title?', function(req, res) {
	var name = req.params.name;
	var title = req.params.title;
	res.send(name + ' was here' + ', who is ' + title);
});

app.get('*', function(req, res) {
	res.send('Bad route');
});

var server = app.listen(3000, function() {
	console.log('Listening on port 3000');
});