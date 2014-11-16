$(document).ready(function () {
    $('#map_canvas').gmap({
    	'streetViewControl': false,
    	'zoom': 10
    }).bind('init', function(event, map) {
        $('#map_canvas').gmap('getCurrentPosition', function(position, status) {
			if ( status === 'OK' ) {
				var currPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				$('#map_canvas').gmap('addMarker', {
					'position': currPosition,
					'bounds': true,
					'animation': google.maps.Animation.DROP,
					'zoom': 10,
					'icon':new google.maps.MarkerImage('images/arrow.png')
				}).click(function() {
				$('#map_canvas').gmap('openInfoWindow', { 
					'content': 'You are here!'
				}, this);
			});
			}else{
				alert("Location could not be found!");
			}
		});
    });
});