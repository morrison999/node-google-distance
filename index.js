'use strict';

var qs = require('querystring'),
    request = require('request');

var DISTANCE_API_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json?';

var GoogleDistance = function() {
  this.apiKey = '';
  this.businessClientKey = '';
  this.businessSignatureKey = '';
};

GoogleDistance.prototype.get = function(args, callback) {
  var self = this;
  var options = this.formatOptions(args);
  this.fetchData(options, function(err, data) {
    if (err) return callback(err);
    self.formatResults(data, options, function(err, results) {
      if (err) return callback(err);
      return callback(null, results);
    });
  });
};

GoogleDistance.prototype.formatOptions = function(args) {
  var options = {
    index: args.index || null,
    origins: args.origin,
    destinations: args.destination,
    mode: args.mode || 'driving',
    units: args.units || 'metric',
    language: args.language || 'en',
    avoid: args.avoid || null,
    sensor: args.sensor || false,
    key: this.apiKey
  };

  if (this.businessClientKey && this.businessSignatureKey) {
    delete options.key;
    options.client = this.businessClientKey;
    options.signature = this.businessSignatureKey;
  }
  if (!options.origins) {
    throw new Error('Argument Error: Origin is invalid');
  }
  if (!options.destinations) {
    throw new Error('Argument Error: Destination is invalid');
  }
  return options;
};

GoogleDistance.prototype.formatResults = function(data, options, callback) {
  var requestStatus = data.status;
  if (requestStatus != 'OK') {
    return callback(new Error('Status error: ' + requestStatus + ': ' + data.error_message));
  }
  var resultStatus = data.rows[0].elements[0].status;
  if (resultStatus != 'OK') {
    return callback(new Error('Result error: ' + resultStatus));
  }

  var element = data.rows[0].elements[0];
  var results = {
    index: options.index,
    distance: element.distance.text,
    distanceValue: element.distance.value,
    duration: element.duration.text,
    durationValue: element.duration.value,
    origin: data.origin_addresses[0],
    destination: data.destination_addresses[0],
    mode: options.mode,
    units: options.units,
    language: options.language,
    avoid: options.avoid,
    sensor: options.sensor
  };
  return callback(null, results);
};

GoogleDistance.prototype.fetchData = function(options, callback) {
  request(DISTANCE_API_URL + qs.stringify(options), function (err, res, body) {
    if (!err && res.statusCode == 200) {
      var data = JSON.parse(body);
      callback(null, data);
    } else {
      callback(new Error('Request error: Could not fetch data from Google\'s servers: ' + body));
    }
  });
};

module.exports = new GoogleDistance();
