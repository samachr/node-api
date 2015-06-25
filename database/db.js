//test database for development

var sqlite3 = require('sqlite3').verbose();
var dbdir = './';
var db = new sqlite3.Database(':memory:');
var dbconfig = require('./config.js');

db.run("CREATE TABLE IF NOT EXISTS bears (id INTEGER PRIMARY KEY, name TEXT)");
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, taxrate REAL)");
// db.run("CREATE TABLE IF NOT EXISTS brands (id INTEGER PRIMARY KEY, brand INT)");
// db.run("CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY, userid INT, count INT, price REAL, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)");
// db.run("CREATE TABLE IF NOT EXISTS images (filename TEXT)");


db.serialize(function() {

  db.run("INSERT INTO bears (name) VALUES (?)", "Kevin Murphy");
  db.run("INSERT INTO bears (name) VALUES (?)", "Care Bear");
  db.run("INSERT INTO bears (name) VALUES (?)", "Bare Dare");
  db.run("INSERT INTO bears (name) VALUES (?)", "Stare Dare Bear Care, Jr.");


  db.run("INSERT INTO users (name, taxrate) VALUES (?, ?)", "Bear User", 5.5);

});


module.exports = db;
