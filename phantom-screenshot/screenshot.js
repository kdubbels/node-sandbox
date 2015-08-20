var phantom = require('phantom');
var pageUrl = "http://localhost:8000/carmel_tables_d3%20copy.html";

phantom.create(function (ph) {
	ph.createPage(function (page) {
		page.open(pageUrl, function(status) {
			console.log(status);
			setTimeout(function(){
				page.render('screenshot1.pdf', function(finished){
					console.log('rendering '+pageUrl+' done');
					ph.exit();
				});
			}, 15000);
		});
	});
});