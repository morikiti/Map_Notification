var map;
var marker1;
var marker2;

function initialize() {
  var latlng = new google.maps.LatLng(33.961942,130.958662);
  var opts = {
    zoom: 14,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map_canvas"), opts);

  var m_latlng1 = new google.maps.LatLng(33.965074,130.952654);
  marker1 = new google.maps.Marker({
    position: m_latlng1
  });

  var m_latlng2 = new google.maps.LatLng(33.958739,130.964155);
  marker2 = new google.maps.Marker({
    position: m_latlng2
  });
}

function doOpen() {
  marker1.setMap(map);
  marker2.setMap(map);
}

function doClose() {
  marker1.setMap(null);
  marker2.setMap(null);
}