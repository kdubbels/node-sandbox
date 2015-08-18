var fs = require("fs");
var options = { encoding: "utf-8" };

fs.readFile("myfile.txt", options, function(err, data) {
	
	if (err) {
		console.error("Error reading file!"); 
	return; 
	}

	if (data.match(/x/gi) !== null) {
		console.log(data.match(/x/gi).length + " letter X's");
	} else {
		console.log("No X's, brah.");
	}

});