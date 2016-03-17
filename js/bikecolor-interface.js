// var alarmClock = require('./../js/alarmClock.js').alarmClock;
var apiKey = require('./../.env').apiKey;


$(document).ready(function() {
  //This will initialize the map but will not show until you call upon the method at the end
    var image = '../img/candy (3).png';
  function initMap() {
    var customMapType = new google.maps.StyledMapType([
      {
        stylers: [
          {hue: '#00aca6'},
          {visibility: 'simplified'},
          {gamma: 0.5},
          {weight: 0.5}
        ]
      },
      {
        elementType: 'labels',
        stylers: [{visibility: 'on'}]
      },
      {
        featureType: 'water',
        stylers: [{color: '#00aca6'}]
      }
    ], {
      name: 'Custom Style' //this is a button at the top of the map, user can chose either custom or regular map
  });

  var customMapTypeId = 'custom_style'; //adds styles to map
  var geocoder = new google.maps.Geocoder();
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 40.674, lng: -73.946},  // Brooklyn.
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
    }
  });
  map.mapTypes.set(customMapTypeId, customMapType);
  map.setMapTypeId(customMapTypeId);

  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map); //on click it will reposition the map
  });

  var beachMarker = new google.maps.Marker({
    position: {lat: 40.674, lng: -73.946},
    map: map,
    icon: image
  });
}
initMap(); //initialize the map and it will show in browser, without this it will not work
});

//this makes the geolocation work
function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var image = '../img/candy (3).png';
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location,
        icon: image
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
