var assert = require('chai').assert,
    distance = require('../');

describe('google-distance', function() {

  describe('#fetchData()', function() {

    it('should GET without error', function(done) {
      var options = {
        origin: 'San Francisco, CA',
        destination: 'San Diego, CA'
      };
      distance.fetchData(options, done);
    });

  });

});
