$(document).ready(function () {
	$.getJSON("restaurants.json", function(json){//Get jSON document
		var restaurantName = $.cookie('restaurant');

		document.title = 'EatHFX - ' + restaurantName;

		var restaurant;

		for (var i = 0; i < json.restaurants.length; i++) {
			if(json.restaurants[i].name == restaurantName){
				restaurant = json.restaurants[i];
				break;
			}
		}

		$("#restaurantName").text(restaurantName);

		//Get restaurant rating
		var restaurantRating = restaurant.rating;
		for (var i = 0; i < restaurantRating; i++) {
			$('#restaurantRating').append(
			    "<i class=\"fa fa-star\"></i>"
			); 
		}

		//Get restaurant price
		var restaurantPrice = restaurant.price;
		for (var i = 0; i < restaurantPrice; i++) {
			$('#restaurantPrice').append(
			    "<i class=\"fa fa-usd\"></i>"
			); 
		}

		$('#restaurantWebsite').append(
		    "<a href=\"http://" + restaurant.website + "\" target=\"_blank\">" 
		    + restaurant.website + "</a>"
		);

		$("#restaurantAddress").text(restaurant.address);

		var cuisines = "";
		for(var i = 0; i < restaurant.cuisines.length; i++){
			cuisines += " " + restaurant.cuisines[i];

			if(i != restaurant.cuisines.length - 1){
				cuisines += ","
			}
		}
		$("#restaurantCuisines").text(cuisines);

		$("#monday").text(restaurant.hours.m);
		$("#tuesday").text(restaurant.hours.tu);
		$("#wednesday").text(restaurant.hours.w);
		$("#thursday").text(restaurant.hours.th);
		$("#friday").text(restaurant.hours.f);
		$("#saturday").text(restaurant.hours.sa);
		$("#sunday").text(restaurant.hours.su);

		$('#image').append(
		    "<img src=\"" + restaurant.image + "\" alt=\"" + restaurantName + "\">"
		); 

		//Add to map
		$('#map_canvas').gmap('clear', 'markers');
		$('#map_canvas').gmap('addMarker', { 
			'position': new google.maps.LatLng(restaurant.latitude, restaurant.longitude),
			'bounds': true,
			'animation': google.maps.Animation.DROP,
		}).click(function() {
			$('#map_canvas').gmap('openInfoWindow', { 
				'content':restaurantName

			}, this);
		});
		placeSelfOnMap();

	});
});

function placeSelfOnMap(){
    $('#map_canvas').gmap('getCurrentPosition', function(position, status) {
		if ( status === 'OK' ) {
			var currPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			$('#map_canvas').gmap('addMarker', {
				'position': currPosition,
				'bounds': true,
				'icon':new google.maps.MarkerImage('images/arrow.png')
			}).click(function() {
				$('#map_canvas').gmap('openInfoWindow', { 
					'content': 'You are here!',
				}, this);
			});
		}else{
			alert("Location could not be found!");
		}
	});
}