
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var requests = [
 {id: 1, environment: 'QA', eligId: '00101075', batches: '22, 28, 29', note: 'Time Clock', started: 'false', done: 'false'},
 {id: 2, environment: 'DEV', eligId: '00101750', batches: '25, 27, 28', note: 'Time Clock', started: 'false', done: 'false'}
];

var reqId = 3;

app.get('/dashboard', routes.dashboard);
app.get('/', routes.index);
app.get('/users', user.list);

app.get('/requests', function(req, res) {
  res.send(requests);
});

app.post('/requests', function(req, res) {
  var request = req.body;
  request.id = reqId;
  reqId++;
  requests.push(request);
  res.send(request);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
