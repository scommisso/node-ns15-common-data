'use strict';

var util = require('util');

var BaseRepository = require('./base-repository');

function WidgetRepository() {
  Array.prototype.unshift.call(arguments, 'widgets');
  BaseRepository.apply(this, arguments);
}

util.inherits(WidgetRepository, BaseRepository);

module.exports = new WidgetRepository();
