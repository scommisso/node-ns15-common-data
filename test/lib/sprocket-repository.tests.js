'use strict';

var proxyquire = require('proxyquire');
var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var expect = chai.expect;

describe('/lib/sprocket-repository', function () {

  var FakeBaseRepository;
  var sprocketRepository;

  beforeEach(function () {
    FakeBaseRepository = function () { };
    sprocketRepository = proxyquire('../../lib/sprocket-repository', {
      './base-repository': FakeBaseRepository
    });
  });

  it('exposes a constructed sprocket repository', function () {
    expect(sprocketRepository).to.be.an.object;
    expect(sprocketRepository).to.be.an.instanceOf(FakeBaseRepository);
  });

});
