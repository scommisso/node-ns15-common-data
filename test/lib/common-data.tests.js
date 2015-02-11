'use strict';

var proxyquire = require('proxyquire').noCallThru();
var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var expect = chai.expect;

var commonData = proxyquire('../../lib/common-data', {
  './sprocket-repository': {},
  './widget-repository': {}
});

describe('/lib/common-data', function () {

});
