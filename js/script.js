/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("We cannot locate you");
    }
})();

function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getLocationWeather(latitude,longitude);
}

function getLocationWeather(latitude,longitude){
$.ajax({
    url: 'https://api.darksky.net/forecast/72a0ccbd2f9e2c583f5c84a84e55748e/' + latitude + ',' + longitude,
    data: 'location',
    type: 'GET',
    crossDomain: true,
    dataType: 'jsonp',
    success: setData,
    error: function(){alert('We seem to have an issue with Our location Service');}
});
 return false;
}
function setData(data){
    let temperature = data.currently.temperature;
    let summary = data.currently.summary;
    $('#temperature').text(temperature);
    $('#summary').text(summary);
    getCityName();
}

// Get city name by IP
function getCityName(){
$.get("https://ipinfo.io", function(response) {
  $('#location').text(response.city);
  if (response.country === "US") {
       $('#temperature').append("F");
      console.log("US");
  }
  else { // Convert the temprature to Celsius if user is not in the US
      let FahrenheitTemprature = parseInt($('#temperature').text());
      let CelsiusTemprature =  Math.round((FahrenheitTemprature - 32) * .5556) ;
      $('#temperature').text(CelsiusTemprature + "°C");
  }
}, "jsonp");
}
    
