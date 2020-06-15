from flask import Flask, render_template, redirect, jsonify
# from flask_pymongo import PyMongo
from search_radius import radius_search_function
#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/api/v1.0/points-inside/<lat>/<long>/<radius>")
def justice_league(lat, long, radius):
    # """Return the points inside radius data as json"""
    # testdict = [{
    #     "type": "FeatureCollection",
    #     "features": [
    #         {
    #             "type": "Feature",
    #             "geometry": {
    #                 "type": "Point",
    #                 "coordinates":  [43.8, -109.1]
    #             },
    #             "properties": {
    #                 "date": "19600102",
    #                 "depth": 15,
    #                 "mag": 6.3,
    #                 "id": "iscgem877909",
    #                 "place": "Bouvet Island region"
    #             }
    #         }
    #     ]
    # }]
    # return jsonify(testdict)
        """Return the points inside radius data as json"""
    testdict = {
        "type": "FeatureCollection",
        "features": [
        { "type": "Feature", "properties": { "date": 19620830, "depth": 15.0, "mag": 5.9, "id": "iscgem875249", "place": "Utah" }, "geometry": { "type": "Point", "coordinates": [ -111.497, 41.961 ] } },
        { "type": "Feature", "properties": { "date": 19750328, "depth": 5.0, "mag": 6.1, "id": "usp0000ad8", "place": "southern Idaho" }, "geometry": { "type": "Point", "coordinates": [ -112.548, 42.061 ] } },
        { "type": "Feature", "properties": { "date": 19750630, "depth": 7.0, "mag": 5.9, "id": "usp0000buf", "place": "Yellowstone National Park, Wyoming" }, "geometry": { "type": "Point", "coordinates": [ -110.605, 44.745 ] } },
        { "type": "Feature", "properties": { "date": 19761208, "depth": 5.0, "mag": 5.5, "id": "usp0000kp6", "place": "Yellowstone National Park, Wyoming" }, "geometry": { "type": "Point", "coordinates": [ -110.793, 44.76 ] } },
        { "type": "Feature", "properties": { "date": 19831028, "depth": 10.0, "mag": 6.9, "id": "usp0001zbv", "place": "southern Idaho" }, "geometry": { "type": "Point", "coordinates": [ -113.857, 44.058 ] } },
        { "type": "Feature", "properties": { "date": 19840822, "depth": 10.0, "mag": 5.6, "id": "usp00026m2", "place": "southern Idaho" }, "geometry": { "type": "Point", "coordinates": [ -114.008, 44.467 ] } },
        { "type": "Feature", "properties": { "date": 19940203, "depth": 7.9, "mag": 5.8, "id": "usp00067xb", "place": "Wyoming" }, "geometry": { "type": "Point", "coordinates": [ -110.976, 42.762 ] } },
        { "type": "Feature", "properties": { "date": 20050726, "depth": 12.9, "mag": 5.6, "id": "usp000dvxx", "place": "western Montana" }, "geometry": { "type": "Point", "coordinates": [ -112.615, 45.365 ] } }
        ]
    }
    # return jsonify(testdict)
    return testdict
    # return jsonify(radius_search_function(lat, long, radius))


# print(points_inside_radius)

if __name__ == "__main__":
    app.run(debug=True)
