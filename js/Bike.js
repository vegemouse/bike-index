var apiKey = require('./../.env');

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
    console.log(bikeList);
    displayFunction(bikeList);
    console.log(response);
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
  console.log(stolenDate);
  return stolenDate;
};

exports.bikeModule = BikeList;
