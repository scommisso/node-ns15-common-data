'use strict';

var Nedb = require('nedb');
var path = require('path');

var dbs = {};

loadDatabase('widgets');
loadDatabase('sprockets');

module.exports = dbs;

function loadDatabase(dbName) {
  var db = new Nedb({
    // Use path.join() for path segments to be compatible on Windows and *nix
    filename: path.join(__dirname, '..', 'data', 'ns15.' + dbName + '.db'),
    onload: function (err) {
      if (err) {
        console.error('ERROR initializing database: ' + dbName);
        throw err;
      }
      console.log('Successfully loaded database: ' + dbName);
    }
  });
  db.loadDatabase();
  dbs[dbName] = db;
}
