'use strict';

var Nedb = require('nedb');
var path = require('path');

var widgets = new Nedb({
  // Use path.join() for path segments to be compatible on Windows and *nix
  filename: path.join(__dirname, '..', 'data', 'ns15.widgets.db'),
  autoload: true
});
widgets.loadDatabase();

var sprockets = new Nedb({
  // Use path.join() for path segments to be compatible on Windows and *nix
  filename: path.join(__dirname, '..', 'data', 'ns15.sprockets.db'),
  autoload: true
});
sprockets.loadDatabase();

module.exports = {
  widgets: widgets,
  sprockets: sprockets
};
