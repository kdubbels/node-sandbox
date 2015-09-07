
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , contacts = require('./modules/contacts');

var url = require('url');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.get('/contacts', 
    function(request, response){
  
      var get_params = url.parse(request.url, true).query;  
      
      if (Object.keys(get_params).length == 0)
      {
        response.setHeader('content-type', 'application/json');
        response.end(JSON.stringify(contacts.list()));  
      }
      else
      {
        response.setHeader('content-type', 'application/json');
        response.end(JSON.stringify(contacts.query_by_arg(get_params.arg, get_params.value)));
      }
    }
);


app.get('/contacts/:number', function(request, response) {
  response.setHeader('content-type', 'application/json'); 
  response.end(JSON.stringify(contacts.query(request.params.number)));
});



app.get('/groups', function(request, response) {
  response.format( {
    'text/xml' : function() {
      response.send(contacts.list_groups_in_xml);
    },
    'application/json' : function() {
      JSON.stringify(contacts.list_groups());
    },
    'default' : function() {
      response.status(406).send('Not Acceptable');
    }
    
  });
});

    

app.get('/groups/:name', function(request, response) {
  console.log ('groups');
  response.setHeader('content-type', 'application/json'); 
  response.end(JSON.stringify(contacts.get_members(request.params.name)));
});
  
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));  
});
