// Create variable and define map




   

// var map = L.map('map').setView([42.697765, -73.108005], 14);  

// var osm=new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
  
  
// function clickme(){

//   var lat =	document.getElementById("latInput").value;
//   var lng =	document.getElementById("longInput").value;
  
//   L.marker([lat, lng]).addTo(myMap).bindPopup(lat + "</br>" + lng);

//   myMap.setView([lat,lng], 18); 
// }  

// Create variable for URL and link to earthquake data   
// var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var url = 'static/js/earthquakes_data_json.geojson';
// Create variable to adjust circle size when zooming in and out
var zoomMap = 4

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
        layer.bindPopup("Place: "+feature.properties.place + "<br> Magnitude: "+feature.properties.mag+"<br> Depth (km): "+feature.properties.depth+ "<br> Date: "+feature.properties.date);
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


  // console.log(myMap)

// Create a legend for map
var magLegend = L.control({
    position: "bottomright"
});
  
  // Add earthquake magnitude legend to map
magLegend.onAdd = function() {
    var div = L.DomUtil.create("div", "legend"),
      labels = ["5-6", "6-7", "7-8", "8-9", "9+", "10+"];
  
    for (var i = 0; i < labels.length; i++) {
      div.innerHTML += '<i style="background:' + getColor(i) + '"></i> ' +
              labels[i] + '<br>' ;
    }
    return div;
};magLegend.addTo(myMap);

// function buttonClick(){
// 	//Get values from textbox
// 	var theLat = document.getElementById("lat").value;
// 	var theLng = document.getElementById("lng").value;
// 	//Make marker
// 	L.marker([theLat,theLng]).addTo(myMap)
// 	.bindPopup("Your point is at " + theLat+", "+theLng).openPopup();
// 	myMap.setView([theLat,theLng], 15);
// };
}

// function buttonClick(){
// 	//Get values from textboxs
// 	var theLat = document.getElementById("lat").value;
// 	var theLng = document.getElementById("lng").value;
// 	//Make marker
// 	L.marker([theLat,theLng]).addTo(myMap)
// 	.bindPopup("Your point is at " + theLat+", "+theLng).openPopup();
// 	myMap.setView([theLat,theLng], 15);
// };

// Create function to set the color dependent on magnitude
function getColor(mag) {
  
  if (mag >= 10) {
    return "red";
  }
  else if (mag >= 9) {
    return "peru";
  }
  else if (mag >= 8) {
   return "darkorange";
  }
  else if (mag >= 7) {
    return "yellow";
  }
  else if (mag >= 6) {
    return "yellowgreen";
  }
  else {
    return "green";
  }
};
// Submit Button handler
function handleSubmit() {
	// Prevent the page from refreshing
	d3.event.preventDefault();
  
	// Select the input value from the form
	var lat = d3.select("#latInput").node().value;
	var long = d3.select("#longInput").node().value;
	// console.log(lat, long);
  
	// clear the input value
	d3.select("#latInput").node().value = "";
	d3.select("#longInput").node().value = "";
	// Build the plot with the new stock
	// buildPlot(stock);
	// L.marker([lat, long]).addTo(myMap).bindPopup(lat + "</br>" + long);
	// myMap.setView([lat,long], 18); 
}
// Add event listener for submit button
d3.select("#submit").on("click", handleSubmit);