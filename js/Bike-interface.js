var BikeList = require('./../js/Bike.js').bikeModule;
var bikeSearch = new BikeList();

var displayBikes = function(bikes) {
  for(var i = 0; i<bikes.length; i++)
  {
    var newBike = new BikeList();
    var bikeColors = newBike.getColors(bikes[i]);
  }
  $('#output').text();
}

$(document).ready(function() {
  $('#input').submit(function(event) {
    event.preventDefault();
    var location = $('#location').val();
    bikeSearch.getBikes(location, displayBikes);
  })
});
