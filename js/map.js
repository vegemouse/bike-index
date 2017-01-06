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
