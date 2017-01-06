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
