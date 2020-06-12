// // Submit Button handler
// function handleSubmit() {
// 	// Prevent the page from refreshing
// 	d3.event.preventDefault();               // Do I need this?
  
// 	// Select the input value from the form
// 	var lat = d3.select("#latInput").node().value;
// 	var long = d3.select("#longInput").node().value;
// 	// console.log(lat, long);
  
//   L.marker([lat, long]).addTo(myMap).bindPopup(lat + "</br>" + long);
// 	// inputLatLong = L.marker([lat, long]).bindPopup(lat + "</br>" + long);
//   myMap.setView([lat,long], 18); 
//   // console.log(inputLatLong);
// 	// clear the input value
// 	d3.select("#latInput").node().value = "";
// 	d3.select("#longInput").node().value = "";

//   // map.flyTo([48.8, 2.4], 10, {
//   //   animate: true,
//   //   duration: 2 // in seconds
//   // });
//   console.log(lat, long);
//   return lat;
// }
// var result = handleSubmit();
// console.log(result);

// // Add event listener for submit button
// d3.select("#submit").on("click", handleSubmit);
//////////////////////////////////////////////////////////////////////////////////////

// Create variable for URL and link to earthquake data   
// var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var url = 'static/js/earthquakes_data_json.geojson';
// Create variable to adjust circle size when zooming in and out
var zoomMap = 1

//  Load json data
d3.json(url,function(data){
// console.log(data);

// Create circles for earthquake data 
function createCircles(feature,latlong){
      let options = {
          radius:feature.properties.mag*zoomMap,
          fillColor: getColor(feature.properties.mag),
          color: "brown",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.6
      }
      return L.circleMarker( latlong, options );

    }
// Create popups to display earthquake info
var earthQuakes = L.geoJSON(data,{
    onEachFeature: function(feature,layer){
        layer.bindPopup("Place:"+feature.properties.place + "<br> Magnitude: "+feature.properties.mag+"<br> Time: "+new Date(feature.properties.date));
    },
      pointToLayer: createCircles

});

createMap(earthQuakes);

});

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
			fillColor: '#f03',
			fillOpacity: 0
		 }
		var latlongMarker = L.marker([latitude, longitude]).bindPopup("Lat: "+latitude + "</br>" + "Long: "+longitude);
		// var latlongRadius = L.circle(circleCenter, theRadius, circleOptions).bindPopup(dist + " miles");
		var latlongRadius = L.circle(circleCenter, theRadius, circleOptions);
		
		myMap.flyTo([ latitude, longitude ], 6, {
			animate: true,
			duration: 2 // in seconds
		});latlongMarker.addTo(myMap);latlongRadius.addTo(myMap);
		var earthquakesMarkers = buildLocalEarthquates(circleCenter, CircleOptions, theRadius);
		earthquakesMarkers.addTo(myMap);
	}

	document.getElementById('submitBtn').addEventListener('click', handleSubmit);

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
