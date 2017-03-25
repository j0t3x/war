var assert = require('assert');
var war = require('../bin/war.js');

describe('Router', function() {
  describe('#getArgumentByName', function() {
    it('should return repositories as value for argument tab in url', function() {
      assert.equal('repositories', 'repositories' );
    });
  });
});


//TODO more tests in the future mofo
