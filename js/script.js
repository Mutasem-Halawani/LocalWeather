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
    let {latitude,longitude} = position.coords;
    getLocationWeather(latitude,longitude);
}

function getLocationWeather(latitude,longitude){
    $.ajax({
            url: 'https://api.darksky.net/forecast/72a0ccbd2f9e2c583f5c84a84e55748e/' + latitude + ',' + longitude,
            data: 'location',
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            success: getData,
            error: function(){alert('We seem to have an issue with Our location Service');}
    })
            .done(function(){
               getCityName();
            })
            .done(function(data,response){
                showAll(data,response);
            });
}

function getData(data){
    console.log('success');
}

function getCityName(){
$.get("https://ipinfo.io", function(response) {
//    console.log(response);
$('#location').text(response.city);
    return(response);
}, "jsonp");
}

function showAll(data,response){
    console.log(data);
//    console.log(response);
    $('#location').text(response.city);
    ['temperature','summary'].forEach(v => {$(`#${v}`).text(data.currently[v]);});
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
}
