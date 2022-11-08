function initMap() {
    var options = {
        zoom: 8,
        center: { lat: 39.9612, lng: -82.9988 }
    }
    var map = new google.maps.Map(document.getElementById("map"), options)
    var marker = new google.maps.Marker({
        position: { lat: 39.9612, lng: -82.9988 },
        map: map,
        // icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/satellite.png'
  
})}