// Get dependencies
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const uri = 'mongodb+srv://joh18157:D3lightfuL@daredevil3.4cper.mongodb.net/final?retryWrites=true&w=majority';

// import the routing file to handle the default (index) route
var index = require('./server/routes/app');
const musicRoutes = require('./server/routes/music');

var app = express(); // create an instance of express

mongoose.connect(uri,
  { useNewUrlParser: true }, (err, res) => {
    if(err) {
      console.log('Connection Failed: ', err);
    } else {
      console.log('Connected to Mongo Atlas database: final!');
    }
  }
);

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, 'dist/final')));

// Tell express to map the default route ('/') to the index route
app.use('/', index);
app.use('/music', musicRoutes);

app.use((req, res, next) => {
  res.render('index');
});

// Tell express to map all other non-defined routes back to the index page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/final/index.html'));
});

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function() {
  console.log('API running on localhost: ' + port)
});
