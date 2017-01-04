var BikeList = require('./../js/Bike.js').bikeModule;
var bikeSearch = new BikeList();

var displayBikes = function(bikes) {
  for(var i = 0; i<bikes.length; i++)
  {
    var newBike = new BikeList();
    $("#output").append("<div class='bike'></div>");

    var bikeTitle = newBike.getTitle(bikes[i]);
    var bikeImage;
    if (bikes[i].thumb != null) {
      bikeImage = newBike.getImage(bikes[i]);
    } else {
      bikeImage = "./../img/placeholder.png";
    }
    var bikeColors = newBike.getColors(bikes[i]);
    var bikeManufacturer = newBike.getManufacturer(bikes[i]);
    var bikeLocation = newBike.getLocation(bikes[i]);
    $('.bike:nth-child(' + (i + 1) + ')').append("<div class ='biketitle'>" + bikeTitle + "</div>");
    $('.bike:nth-child(' + (i + 1) + ')').append("<img class='thumb' src='" + bikeImage + "' alt='thumbnail'>");
    $('.bike:nth-child(' + (i + 1) + ')').append("<div class ='bikecolor'>Colors: " + bikeColors + "</div>");
    $('.bike:nth-child(' + (i + 1) + ')').append("<div class ='bikemanufacturer'>Manufacturer: " + bikeManufacturer + "</div>");
    $('.bike:nth-child(' + (i + 1) + ')').append("<div class ='bikelocation'>Location: " + bikeLocation + "</div>");
  }
}

$(document).ready(function() {
  $('#input').submit(function(event) {
    event.preventDefault();
    var location = $('#location').val();
    $("#output").empty();
    bikeSearch.getBikes(location, displayBikes);
  })
});
