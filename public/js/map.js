if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (p) {
        console.log("Detected Latitiude is " + p.coords.latitude);
        console.log("Detected Longitude is " + p.coords.longitude);

        var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
        var mapOptions = {
            center: LatLng,
            zoom: 40,
            //mapTypeId: google.maps.MapTypeId.ROADMAP
            mapTypeId: 'hybrid'
        };
        var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
        // var marker = new google.maps.Marker({
        //     position: LatLng,
        //     map: map,
        //     title: "<div style = 'height:60px;width:200px'><b>Your location:</b><br />Latitude: " + p.coords.latitude + "<br />Longitude: " + p.coords.longitude
        // });
    

        // google.maps.event.addListener(marker, "click", function (e) {
        //     var infoWindow = new google.maps.InfoWindow();
        //     infoWindow.setContent(marker.title);
        //     infoWindow.open(map, marker);
        // });





        //  Populate Map Markers
        $.get("/api/getLatLangsFromDB", function(data) {
            console.log(data);
            
            //Use data from API call to build markers
            for(var i=0; i < data.length; i++){
                var LatLngLoopMarker = new google.maps.LatLng(data[i].lat, data[i].lng);
                var loopMarker = new google.maps.Marker({
                position: LatLngLoopMarker,
                map: map,
                title: "<div style = 'height:60px;width:200px'><b>Your location:</b><br />Latitude: " + data[i].lat + "<br />Longitude: " + data[i].lng
                });

                google.maps.event.addListener(loopMarker, "click", function (e) {
                var infoWindow = new google.maps.InfoWindow();
                infoWindow.setContent(loopMarker.title);
                infoWindow.open(map, loopMarker);
        });

            }

            
        });



    });
} else {
    alert('Geo Location feature is not supported in this browser.');
}
//gofunction
// function initMap() {
//         var uluru = {lat: -25.363, lng: 131.044};
//         var map = new google.maps.Map(document.getElementById('map'), {
//           zoom: 4,
//           center: uluru
//         });
//         var marker = new google.maps.Marker({
//           position: uluru,
//           map: map
//         });
//       }


