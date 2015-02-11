'use strict';

var proxyquire = require('proxyquire');
var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var expect = chai.expect;

describe('/lib/widget-repository', function () {

  var FakeBaseRepository;
  var widgetRepository;

  beforeEach(function () {
    FakeBaseRepository = function () { };
    widgetRepository = proxyquire('../../lib/widget-repository', {
      './base-repository': FakeBaseRepository
    });
  });

  it('exposes a constructed widget repository', function () {
    expect(widgetRepository).to.be.an.object;
    expect(widgetRepository).to.be.an.instanceOf(FakeBaseRepository);
  });

});
