function iniciarMap(){
  var coord = {lat:-35.00235030291014 ,lng: -71.22926692798941};
  var map = new google.maps.Map(document.getElementById('map'),{
    zoom: 10,
    center: coord
  });
  var marker = new google.maps.Marker({
    position: coord,
    map: map
  });
}