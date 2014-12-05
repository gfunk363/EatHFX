var previousSuggestions = [];
var selectedRating = 0;
var indexList = [];
var cuisinesSelected = [];
$(document).ready(function () {
	pickRestaurant();
    /****************************************************************
							  PRICE HOVER
 	****************************************************************/
    $("#price1").hover(function(){
		$("#price1").css( "color", "red" );
		$("#price2").css( "color", "black" );
		$("#price3").css( "color", "black" );
		$("#price4").css( "color", "black" );
		$("#price5").css( "color", "black" );
	});
	$("#price2").hover(function(){
		$("#price1").css( "color", "red" );
		$("#price2").css( "color", "red" );
		$("#price3").css( "color", "black" );
		$("#price4").css( "color", "black" );
		$("#price5").css( "color", "black" );
	});
	$("#price3").hover(function(){
		$("#price1").css( "color", "red" );
		$("#price2").css( "color", "red" );
		$("#price3").css( "color", "red" );
		$("#price4").css( "color", "black" );
		$("#price5").css( "color", "black" );
	});
	$("#price4").hover(function(){
		$("#price1").css( "color", "red" );
		$("#price2").css( "color", "red" );
		$("#price3").css( "color", "red" );
		$("#price4").css( "color", "red" );
		$("#price5").css( "color", "black" );
	});
	$("#price5").hover(function(){
		$("#price1").css( "color", "red" );
		$("#price2").css( "color", "red" );
		$("#price3").css( "color", "red" );
		$("#price4").css( "color", "red" );
		$("#price5").css( "color", "red" );
	});

	/****************************************************************
							  distance HOVER
 	****************************************************************/
    $("#star1").hover(function(){
		$("#star1").css( "color", "red" );
		$("#star2").css( "color", "black" );
		$("#star3").css( "color", "black" );
		$("#star4").css( "color", "black" );
		$("#star5").css( "color", "black" );
	});
	$("#star2").hover(function(){
		$("#star1").css( "color", "red" );
		$("#star2").css( "color", "red" );
		$("#star3").css( "color", "black" );
		$("#star4").css( "color", "black" );
		$("#star5").css( "color", "black" );
	});
	$("#star3").hover(function(){
		$("#star1").css( "color", "red" );
		$("#star2").css( "color", "red" );
		$("#star3").css( "color", "red" );
		$("#star4").css( "color", "black" );
		$("#star5").css( "color", "black" );
	});
	$("#star4").hover(function(){
		$("#star1").css( "color", "red" );
		$("#star2").css( "color", "red" );
		$("#star3").css( "color", "red" );
		$("#star4").css( "color", "red" );
		$("#star5").css( "color", "black" );
	});
	$("#star5").hover(function(){
		$("#star1").css( "color", "red" );
		$("#star2").css( "color", "red" );
		$("#star3").css( "color", "red" );
		$("#star4").css( "color", "red" );
		$("#star5").css( "color", "red" );
	});

	/****************************************************************
							  DISTANCE HOVER
 	****************************************************************/
    $("#distance1").hover(function(){
		$("#distance1").css( "color", "red" );
		$("#distance2").css( "color", "black" );
		$("#distance3").css( "color", "black" );
		$("#distance4").css( "color", "black" );
		$("#distance5").css( "color", "black" );
	});
	$("#distance2").hover(function(){
		$("#distance1").css( "color", "red" );
		$("#distance2").css( "color", "red" );
		$("#distance3").css( "color", "black" );
		$("#distance4").css( "color", "black" );
		$("#distance5").css( "color", "black" );
	});
	$("#distance3").hover(function(){
		$("#distance1").css( "color", "red" );
		$("#distance2").css( "color", "red" );
		$("#distance3").css( "color", "red" );
		$("#distance4").css( "color", "black" );
		$("#distance5").css( "color", "black" );
	});
	$("#distance4").hover(function(){
		$("#distance1").css( "color", "red" );
		$("#distance2").css( "color", "red" );
		$("#distance3").css( "color", "red" );
		$("#distance4").css( "color", "red" );
		$("#distance5").css( "color", "black" );
	});
	$("#distance5").hover(function(){
		$("#distance1").css( "color", "red" );
		$("#distance2").css( "color", "red" );
		$("#distance3").css( "color", "red" );
		$("#distance4").css( "color", "red" );
		$("#distance5").css( "color", "red" );
	});
});

function pickRestaurant(){
	$.getJSON("restaurants.json", function(json){//Get jSON document
		var numRestaurants = json.restaurants.length;
		indexList = [];
		for (var i = 0; i < numRestaurants; i++) {
			indexList.push(true);
		}

		
		if(cuisinesSelected.length > 0){
			validateRestaurants(json.restaurants, getPrice(), getRating(), getDistance(), cuisinesSelected);
		}else{
			validateRestaurants(json.restaurants, getPrice(), getRating(), getDistance(), null);
		}
		

		//Random number
		var pickedIndex = false;
		var index, conflict;
		var counter = 0;
		var duplicates = [];
		var duplicatePicked = false;
		while(pickedIndex == false){
			//Prevent same restaurant from being recommended again
			conflict = false;
			index = Math.floor(Math.random() * (numRestaurants));
			for (var i = 0; i < previousSuggestions.length; i++) {
				if(previousSuggestions[i] == index){
					conflict = true;
				}
			}
			for (var i = 0; i < duplicatePicked.length; i++) {
				if(duplicatePicked[i] == index){
					duplicatePicked = true;
				}
			}
			if(!duplicatePicked && indexList[index] == false){
				conflict = true;
			}
			if(conflict == false){
				pickedIndex = true;
			}
			if(counter == numRestaurants){
				alert("There are no restaurants left that match your search criteria!");
				return;
			}
			if(duplicatePicked == false){
				counter++;
				duplicates.push(index);
			}
		}

		previousSuggestions.push(index);
		var restaurant = json.restaurants[index];
		displayRestaurant(restaurant);
	});
	
}
function displayRestaurant(restaurant){
	//Get restaurant name
	var restaurantName = restaurant.name;
	$("#restaurantName").text(restaurantName);

	//Set cookie to name of restaurant
	$.cookie('restaurant', restaurantName);

	//Get restaurant rating
	var restaurantRating = restaurant.rating;
	$("#restaurantRating").empty();
	for (var i = 0; i < restaurantRating; i++) {
		$('#restaurantRating').append(
		    "<i class=\"fa fa-star\"></i>"
		); 
	}

	//Get restaurant price
	var restaurantPrice = restaurant.price;
	$("#restaurantPrice").empty();
	for (var i = 0; i < restaurantPrice; i++) {
		$('#restaurantPrice').append(
		    "<i class=\"fa fa-usd\"></i>"
		); 
	}

	//Add directions to map
	$('#map_canvas').gmap('clear', 'markers');
	$('#map_canvas').gmap('getCurrentPosition', function(position, status) {
		if ( status === 'OK' ) {
			var currPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			$('#map_canvas').gmap('displayDirections', { 
				'origin': currPosition, 
				'destination': new google.maps.LatLng(restaurant.latitude, restaurant.longitude), 
				'travelMode': google.maps.DirectionsTravelMode.DRIVING }, { 
				'panel': document.getElementById('directions')
			});

			//Get Distance
			var distance = google.maps.geometry.spherical.computeDistanceBetween(currPosition, new google.maps.LatLng(restaurant.latitude, restaurant.longitude));
			distance = distance/1000.0;
			$("#restaurantDistance").empty();
			$("#restaurantDistance").text(Math.round(distance * 10)/10 + " km");
		}else{
			alert("Location could not be found!");
				$('#map_canvas').gmap('addMarker', { 
					'position': new google.maps.LatLng(restaurant.latitude, restaurant.longitude),
					'bounds': true,
					'animation': google.maps.Animation.DROP,
				});
		}
		
	});
	
}
function validateRestaurants(restaurants, price, rating, distance, cuisine){
	var cuisineFound, cuisineName;
	for (var i = 0; i < restaurants.length; i++) {
		cuisineFound = false;
		var restaurant = restaurants[i];

		//Check price
		if(price != null && restaurant.price > price || restaurant.price < price -1){
			indexList[i] = false;
		} 

		//Check rating
		if(rating != null && restaurant.rating < rating){
			indexList[i] = false;
		}

		//Check distance
		var restaurantDistance;
		$('#map_canvas').gmap('getCurrentPosition', function(position, status) {
			if ( status === 'OK' ) {
				var currPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				
				//Get Distance
				restaurantDistance = google.maps.geometry.spherical.computeDistanceBetween(currPosition, new google.maps.LatLng(restaurant.latitude, restaurant.longitude));
				restaurantDistance = restaurantDistance/1000.0;
				restaurantDistance = Math.round(restaurantDistance * 10)/10;
			}
		});
		if(distance != null){
			if(distance == 1 && restaurantDistance > 2){
				indexList[i] = false;
			}else if(distance == 2 && restaurantDistance > 4){
				indexList[i] = false;
			}else if(distance == 3 && restaurantDistance > 6){
				indexList[i] = false;
			}else if(distance == 4 && restaurantDistance > 8){
				indexList[i] = false;
			}else if(distance == 5 && restaurantDistance > 10){
				indexList[i] = false;
			}
		}

		//Check cuisines
		if(cuisine != null){
			for (var j = 0; j < restaurant.cuisines.length; j++) {	
				cuisineName = restaurant.cuisines[j];
				if($.inArray(cuisineName, cuisinesSelected) != -1){
					cuisineFound = true;
				}
			}
			if(!cuisineFound) indexList[i] = false;
		}
	}
}

function getPrice(){
	var icon = $("#price5").css("color");
	if(icon == "rgb(255, 0, 0)") return 5;

	icon = $("#price4").css("color");
	if(icon == "rgb(255, 0, 0)") return 4;

	icon = $("#price3").css("color");
	if(icon == "rgb(255, 0, 0)") return 3;

	icon = $("#price2").css("color");
	if(icon == "rgb(255, 0, 0)") return 2;

	icon = $("#price1").css("color");
	if(icon == "rgb(255, 0, 0)") return 1;

	return null;
}

function getRating(){
	var icon = $("#star5").css("color");
	if(icon == "rgb(255, 0, 0)") return 5;

	icon = $("#star4").css("color");
	if(icon == "rgb(255, 0, 0)") return 4;

	icon = $("#star3").css("color");
	if(icon == "rgb(255, 0, 0)") return 3;

	icon = $("#star2").css("color");
	if(icon == "rgb(255, 0, 0)") return 2;

	icon = $("#star1").css("color");
	if(icon == "rgb(255, 0, 0)") return 1;

	return null;
}

function getDistance(){
	var icon = $("#distance5").css("color");
	if(icon == "rgb(255, 0, 0)") return 5;

	icon = $("#distance4").css("color");
	if(icon == "rgb(255, 0, 0)") return 4;

	icon = $("#distance3").css("color");
	if(icon == "rgb(255, 0, 0)") return 3;

	icon = $("#distance2").css("color");
	if(icon == "rgb(255, 0, 0)") return 2;

	icon = $("#distance1").css("color");
	if(icon == "rgb(255, 0, 0)") return 1;

	return null;
}
function selectCuisine(cuisineName){
	var cuisineLC = cuisineName.toLowerCase();
	if($.inArray(cuisineName, cuisinesSelected) == -1){
		cuisinesSelected.push(cuisineName);
		$("#" + cuisineLC).css("height", "25%");
	}else{
		cuisinesSelected.splice($.inArray(cuisineName, cuisinesSelected), 1);
		$("#" + cuisineLC).css("height", "100%");
	}
}
function clearAll(){
	var cuisineName;
	for(var i = 0; i < cuisinesSelected.length; i++){
		cuisineName = cuisinesSelected[i].toLowerCase();
		$("#" + cuisineName).css("height", "100%");
	}

	cuisinesSelected = [];

	$("#price1").css( "color", "black" );
	$("#price2").css( "color", "black" );
	$("#price3").css( "color", "black" );
	$("#price4").css( "color", "black" );
	$("#price5").css( "color", "black" );

	$("#star1").css( "color", "black" );
	$("#star2").css( "color", "black" );
	$("#star3").css( "color", "black" );
	$("#star4").css( "color", "black" );
	$("#star5").css( "color", "black" );

	$("#distance1").css( "color", "black" );
	$("#distance2").css( "color", "black" );
	$("#distance3").css( "color", "black" );
	$("#distance4").css( "color", "black" );
	$("#distance5").css( "color", "black" );
}