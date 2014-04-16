'use strict';

var qs = require('querystring'),
    request = require('request');

var DISTANCE_API_URL = 'http://maps.googleapis.com/maps/api/distancematrix/json?';

exports.get = function(args, callback) {
  var options = {
    index: args.index || null,
    origins: args.origin,
    destinations: args.destination,
    mode: args.mode || 'driving',
    units: args.units || 'imperial',
    language: args.language || 'en',
    avoid: args.avoid || null,
    sensor: args.sensor || false
  };

  if (!options.origins) {
    return callback(new Error('Argument Error: Origin is invalid'));
  }
  if (!options.destinations) {
    return callback(new Error('Argument Error: Destination is invalid'));
  }

  fetchData(options, function(err, data) {
    if (err) {
      return callback(err);
    }
    var requestStatus = data.status;
    var resultStatus = data.rows[0].elements[0].status;
    if (requestStatus != 'OK') {
      return callback(new Error('Status error: ' + requestStatus));
    }
    if (resultStatus != 'OK') {
      return callback(new Error('Result error: ' + resultStatus));
    }
    var result = {
      index: options.index,
      distance: data.rows[0].elements[0].distance.text,
      duration: data.rows[0].elements[0].duration.text,
      origin: data.origin_addresses[0],
      destination: data.destination_addresses[0],
      mode: options.mode,
      units: options.units,
      language: options.language,
      avoid: options.avoid,
      sensor: options.sensor
    };
    return callback(null, result);
  });
};

var fetchData = function(options, callback) {
  request(DISTANCE_API_URL + qs.stringify(options), function (err, res, body) {
    if (!err && res.statusCode == 200) {
      var data = JSON.parse(body);
      callback(null, data);
    } else {
      callback(new Error('Request error: Could not fetch data from Google\'s servers'));
    }
  });
};
