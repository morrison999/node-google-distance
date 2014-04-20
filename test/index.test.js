var assert = require('chai').assert,
    distance = require('../');

describe('GoogleDistance', function() {

  describe('#fetchData()', function() {

    it('should GET without error', function(done) {
      var options = {
        origin: 'San Francisco, CA',
        destination: 'San Diego, CA'
      };
      distance.fetchData(options, done);
    });

  });

  describe('#get()', function() {

    it('should return proper location data', function(done) {
      var options = {
        origin: 'San Francisco, CA',
        destination: 'San Diego, CA'
      };
      distance.get(options, function(err, data) {
        if (err) return done(err);
        var expectedData = {
          index: null,
          distance: '807 km',
          duration: '7 hours 30 mins',
          origin: 'San Francisco, CA, USA',
          destination: 'San Diego, CA, USA',
          mode: 'driving',
          units: 'metric',
          language: 'en',
          avoid: null,
          sensor: false
        };
        assert.isDefined(data.distance, 'Distance data is missing');
        assert.isDefined(data.duration, 'Duration data is missing');
        for (var key in expectedData) {
          if (key != 'distance' && key != 'duration') {
            assert.strictEqual(data[key], expectedData[key], key + ':');
          }
        }
        done();
      });
    });

  });

});
