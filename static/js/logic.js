// Create variable for URL and link to earthquake data   
// var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var url = '../static/js/earthquakes_data_json.geojson';
// Create variable to adjust circle size when zooming in and out
var zoomMap = 1
var temp = true;
// Create circles for earthquake data 
function createCircles(feature, latlong) {
	// console.log(latlong)


	let options = {
		radius: feature.properties.mag * zoomMap,
		fillColor: getColor(feature.properties.mag),
		color: "brown",
		weight: 1,
		opacity: 0,
		fillOpacity: 0.6
		// zIndexOffset: 1000
	}

	if (temp == true) {
		console.log(L.circleMarker(latlong, options));
		temp = false;
	}
	return L.circleMarker(latlong, options);

}


//  Load json data
d3.json(url, function (data) {
	// console.log(data);


	// Create popups to display earthquake info
	var earthQuakes = L.geoJSON(data, {
		onEachFeature: function (feature, layer) {
			layer.bindPopup("Place:" + feature.properties.place + "<br> Magnitude: " + feature.properties.mag + "<br> Time: " + new Date(feature.properties.date));
		},
		pointToLayer: createCircles

	});

	createMap(earthQuakes);

});
// Filtered data for new earthquakes
function buildLocalEarthquates(circleCenter, theRadius, localData) {
	console.log("buildlocalEarthquates Data", circleCenter, theRadius);
	let earthQuakeArray = [];

	console.log("buildLocalEarthquakes Local Data ", localData);
	earthQuakeArray = L.geoJSON(localData, {
		onEachFeature: function (feature, layer) {
			layer.bindPopup("Place:" + feature.properties.place + "<br> Magnitude: " + feature.properties.mag + "<br> Time: " + new Date(feature.properties.date));
		},
		pointToLayer: createCircles

	});
	console.log("earthquake array", earthQuakeArray);

// 	let feature = localData[0].features[0];
// 	let latlong = {
// 		lat: feature.geometry.coordinates[1],
// 		lng: feature.geometry.coordinates[0]
// 	};
// 	let circle = createCircles(feature, latlong);
// 	earthQuakeArray.push(circle.bindPopup("Place:" + feature.properties.place + "<br> Magnitude: " + feature.properties.mag + "<br> Time: " + new Date(feature.properties.date)));


// 	// localData.array.forEach(feature => {
// 	// 	feature = feature.features;
// 	// 	let latlong = {
// 	// 		lat: feature.geometry.coordinates[1],
// 	// 		lng: feature.geometry.coordinates[0]
// 	// 	};
// 	// 	let circle = createCircles(feature, latlong);
// 	// 	earthQuakeArray.push(circle.bindPopup("Place:" + feature.properties.place + "<br> Magnitude: " + feature.properties.mag + "<br> Time: " + new Date(feature.properties.date)));
// 	// });

// 	return earthQuakeArray;

}
function createMap(earthQuakes) {
	// Add layer for map
	var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
		attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
		maxZoom: 18,
		id: "mapbox.light",
		accessToken: API_KEY
	});

	// Create variable and define map
	var myMap = L.map("map", {
		center: [
			37.383064, -109.071236
		],
		zoom: zoomMap,
		layers: [lightMap, earthQuakes]
	});

	// result.addTo(myMap);

	// Create a legend for map
	var magLegend = L.control({
		position: "bottomright"
	});

	function handleSubmit(event) {
		// Prevent the page from refreshing
		event.preventDefault();

		// Select the input value from the form
		var latitude = d3.select('#latInput').node().value;
		var longitude = d3.select('#longInput').node().value;
		var dist = d3.select('#radiusInput').node().value;
		console.log(latitude, longitude, dist);

		// // clear the input value
		d3.select('#latInput').node().value = '';
		d3.select('#longInput').node().value = '';
		d3.select('#radiusInput').node().value = '';
		buttonClick(latitude, longitude, dist);
	}

	function buttonClick(latitude, longitude, dist) {
		console.log('it run the function');
		console.log(dist);
		// var dist = 50;
		var theRadius = parseInt(dist) * 1609.34;  //1609.34 meters in a mile 
		var circleCenter = [latitude, longitude];
		var circleOptions = {
			color: 'red',
			fillColor: 'white',
			fillOpacity: 0
			// zIndexOffset: -1000
		}
		// Creating variables for radius circle and user input lat and long marker
		var latlongMarker = L.marker([latitude, longitude]).bindPopup("Lat: " + latitude + "</br>" + "Long: " + longitude);
		var latlongRadius = L.circle(circleCenter, theRadius, circleOptions).bindPopup(dist + " miles");
		


		// myMap.removeLayer(earthQuakes);


		myMap.flyTo([latitude, longitude], 6, {
			animate: true,
			duration: 2 // in seconds
		});
		latlongMarker.addTo(myMap); 
		latlongRadius.addTo(myMap).bringToBack();

		d3.json(`/api/v1.0/points-inside/${circleCenter[0]}/${circleCenter[1]}/${theRadius}`, function (localEarthquakes) {
			console.log("local earthquakes", localEarthquakes);


			var earthquakeMarkers = buildLocalEarthquates(circleCenter, theRadius, localEarthquakes);
			console.log(earthquakeMarkers);
			earthQuakes = L.layerGroup(earthquakeMarkers);
			earthQuakes.addTo(myMap);
		});
		// var url2 = '../static/js/output.json';
		// console.log(url2);
		// d3.json(url2, function (data) {
		// 	// console.log(data);
		// 	console.log(data);
		
		// 	// Create popups to display earthquake info
		// 	var earthQuakes2 = L.geoJSON(data, {
		// 		onEachFeature: function (feature, layer) {
		// 			layer.bindPopup("Place:" + feature.properties.place + "<br> Magnitude: " + feature.properties.mag + "<br> Time: " + new Date(feature.properties.date));
		// 		},
		// 		pointToLayer: createCircles
		
		// 	});
		
		// 	// createMap(earthQuakes);
		// 	earthquakes2.addTo(myMap);
		
		// });
	}


	document.getElementById('submitBtn').addEventListener('click', handleSubmit);

	var legend = L.control({ position: 'bottomleft' });

	legend.onAdd = function (map) {
		var div = L.DomUtil.create('div', 'legend'),
			mags = ['5 to 5.5', '5.5 - 6', '6-7', '7-8', '8-9', '+9'];
		colors = ['purple', 'blue', 'green', 'yellow', 'orange', 'red'];
		div.id = 'legend';
		div.innerHTML = '<strong>Magnitude Colors</strong><br><br>';
		// loop through our density intervals and generate a label with a colored square for each interval
		for (var i = 0; i < mags.length; i++) {
			div.innerHTML +=
				"<div class='color-" +
				colors[i] +
				"'></div>" +
				"<div class='info'>&nbsp;&nbsp;" +
				mags[i] +
				'</div><br>';
		}

		return div;
	};

	legend.addTo(myMap);
}
// Create function to set the color dependent on magnitude
function getColor(mag) {

	if (mag >= 9) {
		return "red";
	}
	else if (mag >= 8) {
		return "orange";
	}
	else if (mag >= 7) {
		return "yellow";
	}
	else if (mag >= 6) {
		return "green";
	}
	else if (mag >= 5.5) {
		return "blue";
	}
	else {
		return "purple";
	}
};
