$(function() {

  CONSUMER_KEY = 'AIzaSyBMYnXcAtv6frhfBoPIJkH8i_O4ey0ciKs';

  var map = new GMaps({
    div: '#map',
    lat: 43.653226,
    lng: -79.383184,
  });

  function getPhotos() {
    var mapCenter = '' + map.getCenter().lat() + ',' + map.getCenter().lng() + ',2km';
    var url = 'https://api.500px.com/v1/photos/search/' + '&consumer_key=0625cc867b062c5dad58b2bea2ba69343c1b601ecc374541051456f06a32274' + mapCenter + CONSUMER_KEY;

    $.getJSON(url, function(data) {
      $.each(data.photos, function(key, value) {
        setPhotoMarkers(value)
      });
    });

  };

  function setPhotoMarkers(photo) {
    var lat = photo.latitude;
    var lng = photo.longitude;
    var title = photo.name;
    var thumbnail = "<div><img src=" + photo.image_url + "</div>"
    var marker = map.addMarker({
      lat: lat,
      lng: lng,
      title: title,
      infoWindow: {
        content: thumbnail
      }
    });

    marker.addListener('click', function() {
      infoWindow.open(map, marker);

    });

  };

  //map events
  map.addListener('center_changed', function() {
    getPhotos();
  });

  //on load
  getPhotos();

});
