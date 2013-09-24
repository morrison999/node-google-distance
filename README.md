# Google Distance Matrix API for Node.js
Easily get traveling distance and duration info between locations with [Google Distance Matrix API](https://developers.google.com/maps/documentation/distancematrix/)

First node module, please give feedback and suggestions :)

## Installation

	npm install google-distance

## Usage

	var distance = require('google-distance');

	distance.get(
		{	origin: 'San Francisco, CA', 
			destination: 'San Diego, CA'
		}, 
		function(err, data) { 
			if (err) {
				console.error(err);
				return;
			}
			console.log(data);
			//your custom logic...
	});

The above example outputs the following `data` object:

	{ 
		distance: '502 mi',
		duration: '7 hours 48 mins',
		origin: 'San Francisco, CA, USA',
		destination: 'San Diego, CA, USA',
		mode: 'driving',
		units: 'imperial',
		language: 'en',
		avoid: null,
		sensor: false 
	}

## Additional Parameters
In addition to 'origin' and 'destination,' you may include these options to tailor your query:

	{
		mode: driving(default) | walking | bicycling,
		units: imperial(default) | metric, //imperial returns distances in miles/feet. metric in kilometers/meters.
		language: en(default),
		avoid: null(default) | highways | tolls,
		sensor: false(default) | true //determines if a sensor (such as GPS) is used to determine user location.
	}

## Another Example
This one uses more options:

	var distance = require('google-distance');

	distance.get(
		{	origin: 'San Francisco, CA', 
			destination: 'Los Angeles, CA',
			mode: 'bicycling',
			units: 'metric'
		}, 
		function(err, data) { 
			if (err) {
				console.error(err);
				return;
			}
			console.log(data);
			//your custom logic...
	});

The above example outputs the following `data` object:

	{ 
		distance: '800 km',
		duration: '1 day 21 hours',
		origin: 'San Francisco, CA, USA',
		destination: 'Los Angeles, CA, USA',
		mode: 'bicycling',
		units: 'metric',
		language: 'en',
		avoid: null,
		sensor: false 
	}
