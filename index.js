// go away
(function(){
  var ACCURACY_RADIUS = 0.01;
  var seed = 12345;
  var random = function() {
      var x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);

  };

  var yaks = $.getJSON('yaks.json');
  yaks.fail(function(xhr, stat, err) {
    console.log('oh shit');
    console.log(err);
  });

  var totallyLegitLocationEnhancer = function(lat, lng) {
    return latLngFactory(lat + random() * (ACCURACY_RADIUS * 2) - ACCURACY_RADIUS,
      lng + random() * (ACCURACY_RADIUS * 2) - ACCURACY_RADIUS);
  };

  var latLngFactory = function(lat, lng) {
    return new google.maps.LatLng(lat, lng);
  };

  var initialize = function() {
    var mapOptions = {
      center: latLngFactory(36.01, -78.92),
      zoom: 14
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);

    yaks.done(function(data) {
      console.log(data.length);
      data.forEach(function(yak) {
        var infoWindow = new google.maps.InfoWindow({
          content: yak.message
        });
        var marker = new google.maps.Marker({
          position: totallyLegitLocationEnhancer(yak.latitude, yak.longitude),
          map: map,
          title: yak.message
        });
        google.maps.event.addListener(marker, 'click', function() {
          infoWindow.open(map, marker);
        });
      });
    });
  };

  google.maps.event.addDomListener(window, 'load', initialize);
})();
