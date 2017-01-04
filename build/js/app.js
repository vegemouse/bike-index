(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "ac3eca42141dca9307202116d8716cbf5392dd004dc46f54a39642976711a0f3";

},{}],2:[function(require,module,exports){
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

},{"./../.env":1}],3:[function(require,module,exports){
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

},{"./../js/Bike.js":2}]},{},[3]);
