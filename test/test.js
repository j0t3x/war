//window mock
window = {
  location: {
    "hash":"",
    "search":"?tab=repositories",
    "pathname":"/j0t3x",
    "port":"",
    "hostname":"github.com",
    "host":"github.com",
    "protocol":"https:",
    "origin":"https://github.com",
    "href":"https://github.com/j0t3x?tab=repositories",
    "ancestorOrigins":{}
  }
};

var assert = require('assert');
var Router = require('../bin/progressive.router.js');

describe('Router', function() {
  describe('#getArgumentByName', function() {
    it('should return repositories as value for argument tab in url', function() {
      assert.equal('repositories', Router.getArgumentByName('tab'));
    });
  });
});


//TODO more tests in the future mofo
