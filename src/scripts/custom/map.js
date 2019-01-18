var map = document.getElementById('map');

function initMap() {
	var myLatlng = new google.maps.LatLng(60.061317, 30.354959),
		zoomCustom = 13,
		markerSize = new google.maps.Size(50, 80);

	if ($(window).width() > 760) {
		myLatlng = new google.maps.LatLng(60.059351, 30.344845);
		zoomCustom = 15;
		markerSize = new google.maps.Size(70, 110);
	}

	map = new google.maps.Map(document.getElementById('map'), {
		center: myLatlng,
		zoom: zoomCustom,
		mapTypeControl: false,
		disableDefaultUI: true,
		scrollwheel: false
	});
	
	var marker = new google.maps.Marker({
		position: {lat: 60.059621, lng: 30.354866},
		map: map,
		icon: {
			url: "./assets/images/icons/map-marker.png",
			scaledSize: markerSize
		},
		optimized: false
	});
}

if (map) {
	initMap();
	
	$(window).resize(function() {
		initMap();
	});
}

