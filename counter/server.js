var connect = require('connect'); // cookieParser is deprecated as of Connect 3

var app = connect()
	.use(connect.favicon()) // without this, will increment session by two, as it includes attempt to GET favicon.ico
	.use(connect.cookieParser('keyboard cat'))
	.use(connect.session())
	.use(function(req, res, next) {
		var sess = req.session;
		if (sess.views) {
			res.setHeader('Content-Type', 'text/html');
			res.write('<p> views: ' + sess.views + '</p>');
			res.end();
			sess.views++;
		} else {
			sess.views = 1;
			res.end('welcome to the session demo. refresh!');
		}
	});

app.listen(3000);

