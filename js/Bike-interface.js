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
