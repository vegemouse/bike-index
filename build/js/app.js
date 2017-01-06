(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey ="ac3eca42141dca9307202116d8716cbf5392dd004dc46f54a39642976711a0f3"

},{}],2:[function(require,module,exports){
var apiKey = require('./../.env');
var googleMap = require('./../js/map.js').mapModule;

function BikeList() {

}

BikeList.prototype.getBikes = function (location, displayFunction) {
  var that = this;
  $.get('https://bikeindex.org:443/api/v3/search?page=1&per_page=20&location=' + location + '&distance=10&stolenness=proximity&access_token=' + apiKey).then(function(response) {
    var bikeList = [];
    for(var i = 0; i<response.bikes.length; i++)
    {
      bikeList.push(response.bikes[i]);
    }
    displayFunction(bikeList);
  }).fail(function(error) {
    $('#output').text(error.responseJSON.message);
  });
};

BikeList.prototype.getTitle = function(bike) {
  var title = bike.title;
  return title;
}

BikeList.prototype.getImage = function(bike) {
  var image = bike.thumb;
  return image;
}

BikeList.prototype.getColors = function (bike) {
  var colors = bike.frame_colors;
  colors = colors.join();
  colors = colors.replace(/,/g , ', ');
  return colors;
};

BikeList.prototype.getManufacturer = function(bike) {
  var manufacturer = bike.manufacturer_name;
  return manufacturer;
}

BikeList.prototype.getLocation = function(bike) {
  var location = bike.stolen_location;
  location = location.replace(/,/g , ', ');
  return location;
}

BikeList.prototype.getStolenDate = function (bike) {
  var stolenDate = bike.date_stolen;
  stolenDate = moment.unix(stolenDate)._d;
  stolenDate = moment(stolenDate).format('MM.DD.YYYY');
  return stolenDate;
};

var map;
var mapCenter;
BikeList.prototype.displayMap = function()
{
  mapCenter = {lat: 45, lng: -122};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: mapCenter
  });
  var marker = new google.maps.Marker({
    position: mapCenter,
    map: map
  });

}

BikeList.prototype.getLatLong = function (locationsList) {
  this.displayMap();
  var latLng = [];
  var latLngList = [];
  var _this = this;
  for (var i = 0; i<locationsList.length; i++) {
    $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + locationsList[i] + '&key=AIzaSyCErmpmZ3T4lR91u4FoiUT8yN1s8EP7_WU').then(function(response) {
      mapCenter = {lat: response.results[0].geometry.location.lat, lng: response.results[0].geometry.location.lng};
      console.log(mapCenter);
      var marker = new google.maps.Marker({
      position: mapCenter,
      map: map
      });
      map.setCenter(mapCenter);
      console.log(marker);
    });
  };
}

exports.bikeModule = BikeList;

},{"./../.env":1,"./../js/map.js":3}],3:[function(require,module,exports){
function googleMap() {

}

googleMap.prototype.createMap = function(latitude, longitude)
{
  var mapCenter = {lat: latitude, lng: longitude};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: mapCenter
  });
  var marker = new google.maps.Marker({
    position: mapCenter,
    map: map
  });
}
// googleMap.prototype.createLocationMap = function()
// {
//   var map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: -34.397, lng: 150.644},
//     zoom: 12
//   });
//   var infoWindow = new google.maps.InfoWindow({map: map});
//
//   // Try HTML5 geolocation.
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       };
//
//       infoWindow.setPosition(pos);
//       infoWindow.setContent('Location found.');
//       map.setCenter(pos);
//     }, function() {
//       handleLocationError(true, infoWindow, map.getCenter());
//     });
//   } else {
//     // Browser doesn't support Geolocation
//     handleLocationError(false, infoWindow, map.getCenter());
//   }
// }


exports.mapModule = googleMap;

},{}],4:[function(require,module,exports){
var BikeList = require('./../js/Bike.js').bikeModule;
var bikeSearch = new BikeList();
var locationsList = [];

var displayBikes = function(bikes) {
  for(var i = 0; i<bikes.length; i++)
  {
    var newBike = new BikeList();
    $("#output").append("<div class='bike'></div>");

    var bikeTitle = newBike.getTitle(bikes[i]);
    var bikeImage;
    if (bikes[i].thumb !== null) {
      bikeImage = newBike.getImage(bikes[i]);
    } else {
      bikeImage = "./../img/placeholder.png";
    }
    var bikeColors = newBike.getColors(bikes[i]);
    var bikeManufacturer = newBike.getManufacturer(bikes[i]);
    var bikeLocation = newBike.getLocation(bikes[i]);
    locationsList.push(bikeLocation);

    var stolenDate = newBike.getStolenDate(bikes[i]);
    $('.bike:nth-child(' + (i + 1) + ')').append("<img class='thumb' src='" + bikeImage + "' alt='thumbnail'>");

    $('.bike:nth-child(' + (i + 1) + ')').append("<div class ='bikeinfo'></div>");

    $('.bike:nth-child(' + (i + 1) + ') .bikeinfo').append("<div class ='biketitle'>" + bikeTitle + "</div>");
    $('.bike:nth-child(' + (i + 1) + ') .bikeinfo').append("<div class ='stolendate'><strong>Date Stolen:</strong> " + stolenDate + "</div>");
    $('.bike:nth-child(' + (i + 1) + ') .bikeinfo').append("<div class ='bikecolor'><strong>Colors:</strong> " + bikeColors + "</div>");
    $('.bike:nth-child(' + (i + 1) + ') .bikeinfo').append("<div class ='bikemanufacturer'><strong>Manufacturer:</strong> " + bikeManufacturer + "</div>");
    $('.bike:nth-child(' + (i + 1) + ') .bikeinfo').append("<div class ='bikelocation'><strong>Location:</strong> " + bikeLocation + "</div>");
  }
    bikeSearch.getLatLong(locationsList);
}


$(document).ready(function() {
  $('#input').submit(function(event) {
    event.preventDefault();
    var location = $('#location').val();
    $("#output").empty();
    bikeSearch.getBikes(location, displayBikes);
    console.log(locationsList);
  })
});

var googleMap = require('./../js/map.js').mapModule;


$(document).ready(function() {
  // console.log("hello");
  var map = new googleMap();
  $('#createMap').click(function(event) {
    event.preventDefault();
    map.createMap();
  })
  $('#locationMap').click(function() {
    map.createLocationMap();
  })

});

},{"./../js/Bike.js":2,"./../js/map.js":3}]},{},[4]);
