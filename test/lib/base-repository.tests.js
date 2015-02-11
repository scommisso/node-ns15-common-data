'use strict';

// .noCallThru() prevents db instantiation from firing
var proxyquire = require('proxyquire').noCallThru();
var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var expect = chai.expect;

var fakeDb = {};
var BaseRepository = proxyquire('../../lib/base-repository', {
  './db': {
    myDb: fakeDb
  }
});

describe('/lib/base-repository', function () {
  beforeEach(function () {
    fakeDb.find = sinon.stub().yieldsAsync();
    fakeDb.findOne = sinon.stub().yieldsAsync();
    fakeDb.remove = sinon.stub().yieldsAsync();
    fakeDb.update = sinon.stub().yieldsAsync();
  });

  it('exposes a constructor function', function () {
    expect(BaseRepository).to.be.a.function;
    var instance = new BaseRepository('myDb');
    expect(instance).to.be.an.instanceOf(BaseRepository);
    expect(instance.find).to.be.a.function;
    expect(instance.findOne).to.be.a.function;
    expect(instance.remove).to.be.a.function;
    expect(instance.update).to.be.a.function;
  });

  it('#find() calls database #find() method and yields result', function (done) {
    var instance = new BaseRepository('myDb');
    var options = { some: 'options' };
    instance.find(options, function () {
      expect(fakeDb.find).to.have.been.calledWithMatch(options, sinon.match.func);
      done();
    });
  });

  it('#upsert() calls database #upsert() method and yields result', function (done) {
    var instance = new BaseRepository('myDb');
    var entity = { my: 'entity' };
    var options = { some: 'options' };
    instance.upsert(entity, options, function () {
      expect(fakeDb.update).to.have.been.calledWithMatch(
        options, entity, { upsert: true }, sinon.match.func);
      done();
    });
  });
});
