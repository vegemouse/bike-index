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
