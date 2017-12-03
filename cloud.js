var Cloud = function() {};

Cloud.prototype.getRestaurantsList = function(lat, lng, callback) {
	return fetch("https://foodbuddycloudapp.appspot.com/nearby?lat="+lat+"&long="+lng);
	// TODO: Call cloud endpoint
	// console.log("call");
	// https.get("https://foodbuddycloudapp.appspot.com/nearby?lat="+lat+"&long="+lng, function(res) {
	//     console.log(res);
	//     callback(res);
	// });

	// var restaurantData = [];
	// for (var i = 0; i < 15; i++) {
	//   restaurantData.push({
	//     key: i,
	//     image: "https://i.imgur.com/kml7A6s.png",
	//     // name: "Restaurant",
	//     name: Math.random().toString(36).substring(7),
	//     id: "restaurantid" + i,
	//     details: "Details"
	//   })
	// }
	// return restaurantData;
}

Cloud.prototype.getRestaurantDetails = function(restaurantId) {
	// TODO: Call cloud endpoint

	var restaurantDetails = {
		lol: "lol"
	}

	return restaurantDetails;
}

module.exports = new Cloud();