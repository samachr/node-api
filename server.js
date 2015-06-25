// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

var db = require('./database/db.js');
var dbconfig = require('./database/config.js');

// ROUTES FOR OUR API
// =============================================================================
dbconfig.tables.forEach(function(table){
	app.use('/api/' + table.name, require('./routes/rest-api-template.js')(table.name, table.columns));
});

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	console.log('This is authentication...?');
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'Welcome to the api!', links: dbconfig.tables.map(function(table){return '/api/' + table.name})});
});

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
