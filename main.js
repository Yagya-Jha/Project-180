let latitude, longitude, destination;

$(document).ready(function () {
	alert("Please allow the device to know your location!")
	initGeolocation();
})

function initGeolocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(success);
	}
	else {
		alert("Sorry, your browser does not support geolocation services.");
	}
}

$(function () {
	$("#navigate-button").click(function () {
        try{
            window.location.href = `ar_weather.html?source=${latitude};${longitude}&destination=${destination[1]};${destination[0]}`
        }catch(e){
            alert("Coordinates not selected!  \n")
        };
	})
})

function success(position) {
	longitude = position.coords.longitude;
	latitude = position.coords.latitude

	// Initializing Mapbox
	mapboxgl.accessToken = 'pk.eyJ1Ijoia2lyYW4zMDMiLCJhIjoiY2w4c3BhZDQ2MDhlZzNuc3lmcmZ6bjhtZCJ9.TCumMD4Cq2WzVUQrq4oCkw';

	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [longitude, latitude],
		zoom: 4
	});

	map.addControl(
		new MapboxGeocoder({
			accessToken: mapboxgl.accessToken,
			mapboxgl: mapboxgl
		}).on('result', function (e) {
			destination = e.result.center
            console.log(e)
		})
	);

    function addMarkerOnMap(id, loc){
        var img = document.querySelector(id);
        var marker1 = new mapboxgl.Marker({
            element: img
        })
        .setLngLat(loc)
        .addTo(map)
    }

    addMarkerOnMap("#IndiaGate", [77.2295, 28.6129]);
    addMarkerOnMap("#AmberPalace", [75.8513, 26.9855]);
    addMarkerOnMap("#GateWayOfIndia", [72.8347, 18.9220]);
    addMarkerOnMap("#LotusTemple", [77.2588, 28.5535]);
    addMarkerOnMap("#VictoriaMemorial", [88.3426, 22.5448]);
    addMarkerOnMap("#TajMahal", [78.0421, 27.1751]);
    addMarkerOnMap("#QutubMinar", [77.1855, 28.5245]);
    addMarkerOnMap("#CharMinar", [78.4747, 17.3616]);
    addMarkerOnMap("#SanchiStupa", [77.7399, 23.4810]);
    addMarkerOnMap("#HawaMahal", [75.8267, 26.9239]);
    addMarkerOnMap("#Konark", [86.0945, 19.8876]);
    addMarkerOnMap("#Unity", [73.7191, 21.8380]);

}