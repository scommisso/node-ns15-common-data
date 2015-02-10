'use strict';

var proxyquire = require('proxyquire');
var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var expect = chai.expect;

describe('lib/db', function () {

  var db = null;
  var fakeNedbCtor = null;
  beforeEach(function () {
    fakeNedbCtor = sinon.spy(function () {
      return {
        loadDatabase: sinon.stub()
      };
    });
    db = proxyquire('../../lib/db', {
      'nedb': fakeNedbCtor
    });
  });

  describe('widgets database', function () {
    testDatabase('widgets');
  });

  describe('sprockets database', function () {
    testDatabase('sprockets');
  });

  function testDatabase(dbName) {
    var call;

    beforeEach(function () {
      call = findCall(dbName);
    });

    it('is instantiated', function () {
      expect(fakeNedbCtor).to.be.calledWithNew;
      expect(call).to.be.ok;
    });

    it('is exposed from the module', function () {
      var instance = call.returnValue;
      expect(db[dbName]).to.equal(instance);
    });

    it('loads the existing data file', function () {
      var instance = call.returnValue;
      expect(instance.loadDatabase).to.be.calledOnce;
    });

    describe('wires up onload event handler that', function () {
      var onLoad;
      beforeEach(function () {
        onLoad = call.args[0].onload;
      });
      it('throws load errors', function () {
        var err = new Error('uh-oh');
        expect(function () {
          onLoad(err);
        }).to.throw(Error);
      });
      it('does not throw when no error occurs', function () {
        expect(function () {
          onLoad();
        }).to.not.throw(Error);
      });
    });

    function findCall(dbName) {
      var call, i;
      for (i = 0; i < fakeNedbCtor.callCount; i++) {
        call = fakeNedbCtor.getCall(i);
        if (call.calledWithMatch({
          filename: sinon.match(new RegExp('ns15.' + dbName + '.db$'))
        })) {
          return call;
        }
      }
      return null;
    }
  }

});
