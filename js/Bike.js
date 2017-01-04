var apiKey = require('./../.env');

function BikeList() {
}

BikeList.prototype.getBikes = function (location, displayFunction) {
  var that = this;
  $.get('https://bikeindex.org:443/api/v3/search?page=1&per_page=10&location=' + location + '&distance=10&stolenness=proximity&access_token=' + apiKey).then(function(response) {
    var bikeList = [];
    for(var i = 0; i<response.bikes.length; i++)
    {
      bikeList.push(response.bikes[i]);
    }
    console.log(bikeList);
    displayFunction(bikeList);
    console.log(response);
  }).fail(function(error) {
    $('#output').text(error.responseJSON.message);
  });
};

BikeList.prototype.getColors = function (bike) {
  console.log(bike.frame_colors);
};

exports.bikeModule = BikeList;
