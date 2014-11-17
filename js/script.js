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

		//validateRestaurants(restaurants, price, rating, distance, cuisine)
		validateRestaurants(json.restaurants, getPrice(), getRating(), null, null);

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

	//Get restaurant distance
	/*var currPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	var restaurantDistance = calcDistance(currPosition.latitude, 
										  currPosition.longitude, 
										  restaurant.latitude, 
										  restaurant.longitude);
	$("#restaurantDistance").text(restaurantDistance + " km away");*/

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
}
function validateRestaurants(restaurants, price, rating, distance, cuisine){
	var cuisineFound;
	for (var i = 0; i < restaurants.length; i++) {
		cuisineFound = false;
		var restaurant = restaurants[i];
		if(price != null && restaurant.price > price || restaurant.price < price -1){
			indexList[i] = false;
		} 
		if(rating != null && restaurant.rating < rating){
			indexList[i] = false;
		}
		if(cuisine != null){
			for (var j = 0; j < restaurant.cuisines.length; j++) {
				for (var k = 0; k < cuisine.length; k++) {
					if(restaurant.cuisines[j] == cuisine[k]){
						cuisineFound = true;
					}
				};
			}
			if(!cuisineFound) indexList[i] = false;
		}
	}
}
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

function calcDistance(startLat,startLong,destLat,destLong) {
  var radius = 6371; // Radius of the earth in km
  var dLat = (destLat-startLat) * (Math.PI/180); 
  var dLon = (destLong-startLong) * (Math.PI/180); 
  var calc1 = Math.sin(dLat/2) * Math.sin(dLat/2) +
    		  Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(destLat)) * 
    		  Math.sin(dLon/2) * Math.sin(dLon/2); 
  var calc2 = 2 * Math.atan2(Math.sqrt(calc1), Math.sqrt(1-calc1)); 
  var distance = radius * c; // Distance in km
  return distance;
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
function selectCuisine(cuisineName){
	var cuisineLC = cuisineName.toLowerCase();
	if($.inArray(cuisineName, cuisinesSelected) == -1){
		cuisinesSelected.push(cuisineName);
		$("#" + cuisineLC).css("height", "25%");
	}else{
		$("#" + cuisineLC).css("height", "100%");
	}
}