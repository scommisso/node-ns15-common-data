'use strict';

var db = require('./db');

module.exports = BaseRepository;

function BaseRepository(dbName) {
  this.dbName = dbName;
  this.db = db[dbName];
  if (!this.db) {
    throw new Error('dbName must be a valid NEDB database name');
  }
}

BaseRepository.prototype.find = function repositoryFind(options, callback) {
  this.db.find(options, callback);
};

BaseRepository.prototype.findOne = function repositoryFindOne(options, callback) {
  this.db.findOne(options, callback);
};

BaseRepository.prototype.remove = function repositoryRemove(options, callback) {
  this.db.remove(options, callback);
};

BaseRepository.prototype.upsert = function repositoryUpsert(entity, options, callback) {
  this.db.update(options, entity, { upsert: true }, callback);
};
