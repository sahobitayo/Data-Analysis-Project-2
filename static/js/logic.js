// Create our initial map object
// Set the longitude, latitude, and the starting zoom level

var runMarkers = [];

var queryUrl = 'static/js/earthquakes_data_json.geojson';

var zoomMap = 2;

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
	// Once we get a response, send the data.features object to the createFeatures function
	for (var i = 0; i < data.features.length; i++) {
		// console.log(data.features[i].properties.mag);
		// var  earthquakeData = data[i];
		if (data.features[i].properties.mag > 5 && data.features[i].properties.mag <= 5.5) {
			runMarkers.push(
				L.circle([ data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0] ], {
					stroke: false,
					fillColor: 'blue',
					fillOpacity: 0.5,
					radius: data.features[i].properties.mag * 1000 * zoomMap
				}).bindPopup(
					'<i>' +
						data.features[i].properties.place +
						'</i><hr>' +
						'<b>Magnitude</b>: ' +
						data.features[i].properties.mag +
						'<br>' +
						'<b>Lat Lng</b>: ' +
						data.features[i].geometry.coordinates[1] +
						',' +
						data.features[i].geometry.coordinates[0] +
						'<br>' +
						'<b>Depth</b>: ' +
						data.features[i].properties.depth +
						' Kilometers<br>'
				)
			);
			continue;
		} else if (data.features[i].properties.mag > 5.5 && data.features[i].properties.mag <= 6) {
			runMarkers.push(
				L.circle([ data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0] ], {
					stroke: false,
					fillColor: 'LightGreen',
					fillOpacity: 0.5,
					radius: data.features[i].properties.mag * zoomMap
				}).bindPopup(
					'<i>' +
						data.features[i].properties.place +
						'</i><hr>' +
						'<b>Magnitude</b>: ' +
						data.features[i].properties.mag +
						'<br>' +
						'<b>Lat Lng</b>: ' +
						data.features[i].geometry.coordinates[1] +
						',' +
						data.features[i].geometry.coordinates[0] +
						'<br>' +
						'<b>Depth</b>: ' +
						data.features[i].properties.depth +
						' Kilometers<br>'
				)
			);
			continue;
		} else if (data.features[i].properties.mag > 6 && data.features[i].properties.mag <= 7) {
			runMarkers.push(
				L.circle([ data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0] ], {
					stroke: false,
					fillColor: 'green',
					fillOpacity: 0.5,
					radius: data.features[i].properties.mag * 4000 * zoomMap
				}).bindPopup(
					'<i>' +
						data.features[i].properties.place +
						'</i><hr>' +
						'<b>Magnitude</b>: ' +
						data.features[i].properties.mag +
						'<br>' +
						'<b>Lat Lng</b>: ' +
						data.features[i].geometry.coordinates[1] +
						',' +
						data.features[i].geometry.coordinates[0] +
						'<br>' +
						'<b>Depth</b>: ' +
						data.features[i].properties.depth +
						' Kilometers<br>'
				)
			);
			continue;
		} else if (data.features[i].properties.mag > 7 && data.features[i].properties.mag <= 8) {
			runMarkers.push(
				L.circle([ data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0] ], {
					stroke: false,
					fillColor: 'yellow',
					fillOpacity: 0.5,
					radius: data.features[i].properties.mag * 6000 * zoomMap
				}).bindPopup(
					'<i>' +
						data.features[i].properties.place +
						'</i><hr>' +
						'<b>Magnitude</b>: ' +
						data.features[i].properties.mag +
						'<br>' +
						'<b>Lat Lng</b>: ' +
						data.features[i].geometry.coordinates[1] +
						',' +
						data.features[i].geometry.coordinates[0] +
						'<br>' +
						'<b>Depth</b>: ' +
						data.features[i].properties.depth +
						' Kilometers<br>'
				)
			);
			continue;
		} else if (data.features[i].properties.mag > 8 && data.features[i].properties.mag <= 9) {
			runMarkers.push(
				L.circle([ data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0] ], {
					stroke: false,
					fillColor: 'orange',
					fillOpacity: 0.5,
					radius: data.features[i].properties.mag * 8000 * zoomMap
				}).bindPopup(
					'<i>' +
						data.features[i].properties.place +
						'</i><hr>' +
						'<b>Magnitude</b>: ' +
						data.features[i].properties.mag +
						'<br>' +
						'<b>Lat Lng</b>: ' +
						data.features[i].geometry.coordinates[1] +
						',' +
						data.features[i].geometry.coordinates[0] +
						'<br>' +
						'<b>Depth</b>: ' +
						data.features[i].properties.depth +
						' Kilometers<br>'
				)
			);
			continue;
		} else {
			runMarkers.push(
				L.circle([ data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0] ], {
					stroke: false,
					fillColor: 'black',
					fillOpacity: 0.5,
					radius: data.features[i].properties.mag * 10000 * zoomMap
				}).bindPopup(
					'<i>' +
						data.features[i].properties.place +
						'</i><hr>' +
						'<b>Magnitude</b>: ' +
						data.features[i].properties.mag +
						'<br>' +
						'<b>Lat Lng</b>: ' +
						data.features[i].geometry.coordinates[1] +
						',' +
						data.features[i].geometry.coordinates[0] +
						'<br>' +
						'<b>Depth</b>: ' +
						data.features[i].properties.depth +
						' Kilometers<br>'
				)
			);
			continue;
		}
	}

	var runLayer = L.layerGroup(runMarkers);

	var satellite = L.tileLayer(
		'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}',
		{
			attribution:
				'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
			maxZoom: 18,
			minZoom: 1,
			id: 'mapbox.satellite',
			accessToken: API_KEY
		}
	);

	// var street = L.tileLayer(
	// 	'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}',
	// 	{
	// 		attribution:
	// 			'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	// 		maxZoom: 18,
	// 		minZoom: 1,
	// 		id: 'mapbox.street',
	// 		accessToken: API_KEY
	// 	}
	// );

	var myMap = L.map('map', {
		center: [ 25, -20 ],
		zoom: zoomMap,
		layers: [ satellite, runLayer ]
	});

	// Overlays that may be toggled on or off
	var overlayMaps = {
		Earthquakes: runLayer
	};

	var baseMaps = {
		Satellite: satellite
		// Street: street
	};

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
			fillColor: '#f03',
			fillOpacity: 0
		 }
		var latlongMarker = L.marker([latitude, longitude]).bindPopup("Lat: "+latitude + "</br>" + "Long: "+longitude);
		var latlongRadius = L.circle(circleCenter, theRadius, circleOptions).bindPopup(dist + " miles");
		
		myMap.flyTo([ latitude, longitude ], 6, {
			animate: true,
			duration: 2 // in seconds
		});latlongMarker.addTo(myMap);latlongRadius.addTo(myMap);
		var earthquakesMarkers = buildLocalEarthquates(circleCenter, CircleOptions, theRadius);
		earthquakesMarkers.addTo(myMap);
	}
	// function SelectPoints(latitude,longitude){ var dist = document.getElementById("radiusInput").value;
	// 	xy = [latitude,longitude];  //center point of circle

	// 	var theRadius = parseInt(dist) * 1609.34  //1609.34 meters in a mile 
	// 	//dist is a string so it's convered to an Interger.
	
	// 	selPts.length =0;  //Reset the array if selecting new points
	
	// 	layer1.eachLayer(function (layer) {
	// 		// Lat, long of current point as it loops through.
	// 		layer_lat_long = layer.getLatLng();
	
	// 		// Distance from our circle marker To current point in meters
	// 		distance_from_centerPoint = layer_lat_long.distanceTo(xy);
	
	// 		// See if meters is within radius, add the to array
	// 		if (distance_from_centerPoint <= theRadius) {
	// 		 selPts.push(layer.satellite); 
	// 			// selPts.addTo(myMap)
	// 		}
	// 	});

	document.getElementById('submitBtn').addEventListener('click', handleSubmit);
	
	// Add a tile layer (the background map image) to our map
	// We use the addTo method to add objects to our map
	L.control.layers(baseMaps, overlayMaps).addTo(myMap);

	var legend = L.control({ position: 'bottomleft' });

	legend.onAdd = function(map) {
		var div = L.DomUtil.create('div', 'legend'),
			mags = [ '5 to 5.5', '5.5 - 6', '6-7', '7-8', '8-9', '+9' ];
		colors = [ 'purple', 'blue', 'green', 'yellow', 'orange', 'red' ];
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
});
