'use strict';

var util = require('util');

var BaseRepository = require('./base-repository');

function SprocketRepository() {
  Array.prototype.unshift.call(arguments, 'sprockets');
  BaseRepository.apply(this, arguments);
}

util.inherits(SprocketRepository, BaseRepository);

module.exports = new SprocketRepository();
