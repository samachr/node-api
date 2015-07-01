//test database for development

var sqlite3 = require('sqlite3').verbose();
var dbdir = './';

if (process.env.OPENSHIFT_DATA_DIR) {
  var db = new sqlite3.Database(process.env.OPENSHIFT_DATA_DIR + "rest.db");
} else {
  var db = new sqlite3.Database(':memory:');
}
var dbconfig = require('./config.js');

db.run("CREATE TABLE IF NOT EXISTS bears (id INTEGER PRIMARY KEY, name TEXT)");
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, taxrate REAL)");
db.run("CREATE TABLE IF NOT EXISTS dropped (id INTEGER PRIMARY KEY, username TEXT, message TEXT, lat REAL, lon REAL, radius_km REAL, timestamp DATETIME, upvotes INTEGER, downvotes INTEGER, message_type TEXT, expire DATETIME, deleted BOOL, radius_m REAL, area TEXT, city TEXT, county TEXT, state TEXT, radius_type TEXT, lat_r REAL, lon_r REAL, st_address TEXT, zipcode TEXT, country TEXT, headline TEXT)");
db.run("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY, username TEXT, password TEXT, name TEXT, email TEXT, mobile TEXT,avatar TEXT, join_date DATETIME, dob DATETIME, reputation INTEGER)");
// db.run("CREATE TABLE IF NOT EXISTS brands (id INTEGER PRIMARY KEY, brand INT)");
// db.run("CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY, userid INT, count INT, price REAL, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)");
// db.run("CREATE TABLE IF NOT EXISTS images (filename TEXT)");

db.serialize(function() {

  for (var i = 0; i < 100; i++) {
      db.run("INSERT INTO users (name, taxrate) VALUES (?, ?)", "Bear User "+i, i * 5.5);
  }

  db.run("INSERT INTO bears (name) VALUES (?)", "Kevin Murphy");
  db.run("INSERT INTO bears (name) VALUES (?)", "Care Bear");
  db.run("INSERT INTO bears (name) VALUES (?)", "Bare Dare");
  db.run("INSERT INTO bears (name) VALUES (?)", "Stare Dare Bear Care, Jr.");


  db.run("INSERT INTO users (name, taxrate) VALUES (?, ?)", "Bear User", 5.5);

  db.run("INSERT INTO dropped (username, lat, lon, timestamp, lat_r, lon_r, headline) VALUES (?,?,?,?,?,?,?)", "kyle", 40.635958500, -111.8083391, "2015-06-26 12:50:07", 0.709231270528, -1.951423648, "hello");

  db.run("INSERT INTO user (username, password, name, email, mobile, join_date, reputation) VALUES (?,?,?,?,?,?,?)", "kyle", "d7b47bfa1e25cd2de6142522d486b2fb4c818598c090ccd4ef5c6ba415aa7846ca4da04decbdbf04", "Kyle Carter ", "kyle@kyle.com", "samsung!", "2015-04-09 00:00:00", 100);
});

module.exports = db;
