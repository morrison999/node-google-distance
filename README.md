# Google Distance Matrix API for Node.js
[![Build Status](https://travis-ci.org/edwlook/node-google-distance.svg?branch=master)](https://travis-ci.org/edwlook/node-google-distance)

Easily get traveling distance and duration data between locations with the [Google Distance Matrix API](https://developers.google.com/maps/documentation/distancematrix/)

## Installation

    npm install google-distance

## Usage
```js
var distance = require('google-distance');

distance.get(
  {
    origin: 'San Francisco, CA',
    destination: 'San Diego, CA'
  },
  function(err, data) {
    if (err) return console.log(err);
    console.log(data);
});
```
The above example outputs the following `data` object:
```js
{
  index: null,
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
```
## Additional Parameters

Here is a full list of options you can include to tailor your query:

* origin, destination - `name` (eg. `'San Francisco, CA'`) | `latitude/longitude` (eg. `'51.510652,-0.095444'`)
* index - `null` (default) | specify an index for identification
* mode - `'driving'` (default) | `'walking'` | `'bicycling'`
* units - `'imperial'` (default) miles/feet | `'metric'` kilometers/meters
* language - `'en'` (default) | [more languages](https://spreadsheets.google.com/pub?key=p9pdwsai2hDMsLkXsoM05KQ&gid=1)
* avoid - `null` (default) | `'highways'` | `'tolls'`
* sensor - `false` (default) | `true` | determines if GPS is used to find user location

## More Examples

This example uses `mode` and `units`:

```js
distance.get(
  {
    origin: 'San Francisco, CA',
    destination: 'Los Angeles, CA',
    mode: 'bicycling',
    units: 'metric'
  },
  function(err, data) {
    if (err) return console.log(err);
    console.log(data);
});
```

Outputs:

```js
{
  index: null,
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
```

***

Let's use latitude and longitude for our origin/destination and an index:

```js
distance.get(
{
  index: 1,
  origin: '37.772886,-122.423771',
  destination: '37.871601,-122.269104'
},
function(err, data) {
  if (err) return console.log(err);
  console.log(data);
});
```

Outputs:

```js
{
  index: 1,
  distance: '13.6 mi',
  duration: '20 mins',
  origin: 'Octavia Boulevard, San Francisco, CA 94102, USA',
  destination: '2066-2070 University Avenue, Berkeley, CA 94704, USA',
  mode: 'driving',
  units: 'imperial',
  language: 'en',
  avoid: null,
  sensor: false
}
```

## Running Tests

1) Install the development dependencies:

    npm install

2) Run the tests:

    npm test
