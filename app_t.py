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
    { "type": "Feature", "properties": { "date": 19620830, "depth": 15.0, "mag": 5.9, "id": "iscgem875249", "place": "Utah", "index_right": 0, "lat": -111.497, "long": 41.961 }, "geometry": { "type": "Point", "coordinates": [ -111.497, 41.961 ] } },
    { "type": "Feature", "properties": { "date": 19660816, "depth": 10.0, "mag": 5.7, "id": "iscgem844550", "place": "Nevada", "index_right": 0, "lat": -114.157, "long": 37.38 }, "geometry": { "type": "Point", "coordinates": [ -114.157, 37.38 ] } },
    { "type": "Feature", "properties": { "date": 19661220, "depth": 1.2, "mag": 5.62, "id": "ci3329931", "place": "53km NE of Beatty, NV", "index_right": 0, "lat": -116.408, "long": 37.3022 }, "geometry": { "type": "Point", "coordinates": [ -116.408, 37.3022 ] } },
    { "type": "Feature", "properties": { "date": 19680426, "depth": 1.2, "mag": 5.63, "id": "ci3342128", "place": "50km NNE of Beatty, NV", "index_right": 0, "lat": -116.456, "long": 37.2953 }, "geometry": { "type": "Point", "coordinates": [ -116.456, 37.2953 ] } },
    { "type": "Feature", "properties": { "date": 19681219, "depth": 1.4, "mag": 5.52, "id": "ci3342181", "place": "44km NE of Beatty, NV", "index_right": 0, "lat": -116.474, "long": 37.2315 }, "geometry": { "type": "Point", "coordinates": [ -116.474, 37.2315 ] } },
    { "type": "Feature", "properties": { "date": 19690916, "depth": 1.2, "mag": 5.82, "id": "ci3326197", "place": "52km NNE of Beatty, NV", "index_right": 0, "lat": -116.461, "long": 37.3142 }, "geometry": { "type": "Point", "coordinates": [ -116.461, 37.3142 ] } },
    { "type": "Feature", "properties": { "date": 19700326, "depth": 1.2, "mag": 5.54, "id": "ci3325031", "place": "48km NNE of Beatty, NV", "index_right": 0, "lat": -116.534, "long": 37.3005 }, "geometry": { "type": "Point", "coordinates": [ -116.534, 37.3005 ] } },
    { "type": "Feature", "properties": { "date": 19730606, "depth": 1.1, "mag": 5.64, "id": "ci3319623", "place": "52km NE of Beatty, NV", "index_right": 0, "lat": -116.346, "long": 37.245 }, "geometry": { "type": "Point", "coordinates": [ -116.346, 37.245 ] } },
    { "type": "Feature", "properties": { "date": 19750328, "depth": 5.0, "mag": 6.1, "id": "usp0000ad8", "place": "southern Idaho", "index_right": 0, "lat": -112.548, "long": 42.061 }, "geometry": { "type": "Point", "coordinates": [ -112.548, 42.061 ] } },
    { "type": "Feature", "properties": { "date": 19750626, "depth": 6.0, "mag": 5.52, "id": "ci12328563", "place": "54km NE of Beatty, NV", "index_right": 0, "lat": -116.369, "long": 37.2788 }, "geometry": { "type": "Point", "coordinates": [ -116.369, 37.2788 ] } },
    { "type": "Feature", "properties": { "date": 19750630, "depth": 7.0, "mag": 5.9, "id": "usp0000buf", "place": "Yellowstone National Park, Wyoming", "index_right": 0, "lat": -110.605, "long": 44.745 }, "geometry": { "type": "Point", "coordinates": [ -110.605, 44.745 ] } },
    { "type": "Feature", "properties": { "date": 19751028, "depth": 1.3, "mag": 5.67, "id": "ci3006257", "place": "52km NE of Beatty, NV", "index_right": 0, "lat": -116.411, "long": 37.2902 }, "geometry": { "type": "Point", "coordinates": [ -116.411, 37.2902 ] } },
    { "type": "Feature", "properties": { "date": 19760103, "depth": 1.5, "mag": 5.84, "id": "ci3001652", "place": "57km NE of Beatty, NV", "index_right": 0, "lat": -116.333, "long": 37.2965 }, "geometry": { "type": "Point", "coordinates": [ -116.333, 37.2965 ] } },
    { "type": "Feature", "properties": { "date": 19760212, "depth": 1.2, "mag": 5.81, "id": "ci3002022", "place": "47km NNE of Beatty, NV", "index_right": 0, "lat": -116.488, "long": 37.2713 }, "geometry": { "type": "Point", "coordinates": [ -116.488, 37.2713 ] } },
    { "type": "Feature", "properties": { "date": 19760314, "depth": 1.3, "mag": 5.84, "id": "ci3002345", "place": "51km NNE of Beatty, NV", "index_right": 0, "lat": -116.471, "long": 37.306 }, "geometry": { "type": "Point", "coordinates": [ -116.471, 37.306 ] } },
    { "type": "Feature", "properties": { "date": 19760317, "depth": 0.9, "mag": 5.52, "id": "ci3002390", "place": "55km NE of Beatty, NV", "index_right": 0, "lat": -116.312, "long": 37.2558 }, "geometry": { "type": "Point", "coordinates": [ -116.312, 37.2558 ] } },
    { "type": "Feature", "properties": { "date": 19761208, "depth": 5.0, "mag": 5.5, "id": "usp0000kp6", "place": "Yellowstone National Park, Wyoming", "index_right": 0, "lat": -110.793, "long": 44.76 }, "geometry": { "type": "Point", "coordinates": [ -110.793, 44.76 ] } },
    { "type": "Feature", "properties": { "date": 19831028, "depth": 10.0, "mag": 6.9, "id": "usp0001zbv", "place": "southern Idaho", "index_right": 0, "lat": -113.857, "long": 44.058 }, "geometry": { "type": "Point", "coordinates": [ -113.857, 44.058 ] } },
    { "type": "Feature", "properties": { "date": 19831029, "depth": 10.0, "mag": 5.5, "id": "usp0001zda", "place": "southern Idaho", "index_right": 0, "lat": -114.115, "long": 44.281 }, "geometry": { "type": "Point", "coordinates": [ -114.115, 44.281 ] } },
    { "type": "Feature", "properties": { "date": 19840822, "depth": 10.0, "mag": 5.6, "id": "usp00026m2", "place": "southern Idaho", "index_right": 0, "lat": -114.008, "long": 44.467 }, "geometry": { "type": "Point", "coordinates": [ -114.008, 44.467 ] } },
    { "type": "Feature", "properties": { "date": 19880814, "depth": 9.9, "mag": 5.5, "id": "usp0003k03", "place": "Utah", "index_right": 0, "lat": -110.869, "long": 39.128 }, "geometry": { "type": "Point", "coordinates": [ -110.869, 39.128 ] } },
    { "type": "Feature", "properties": { "date": 19920902, "depth": 13.739, "mag": 5.6, "id": "ci3059028", "place": "63km ENE of Mesquite, Nevada", "index_right": 0, "lat": -113.472, "long": 37.09 }, "geometry": { "type": "Point", "coordinates": [ -113.472, 37.09 ] } },
    { "type": "Feature", "properties": { "date": 19940203, "depth": 7.9, "mag": 5.8, "id": "usp00067xb", "place": "Wyoming", "index_right": 0, "lat": -110.976, "long": 42.762 }, "geometry": { "type": "Point", "coordinates": [ -110.976, 42.762 ] } },
    { "type": "Feature", "properties": { "date": 20050726, "depth": 12.9, "mag": 5.6, "id": "usp000dvxx", "place": "western Montana", "index_right": 0, "lat": -112.615, "long": 45.365 }, "geometry": { "type": "Point", "coordinates": [ -112.615, 45.365 ] } },
    { "type": "Feature", "properties": { "date": 20080221, "depth": 7.9, "mag": 6.2, "id": "nn00234425", "place": "8km ENE of Wells, Nevada", "index_right": 0, "lat": -114.872, "long": 41.1444 }, "geometry": { "type": "Point", "coordinates": [ -114.872, 41.1444 ] } }
    ]
    }
    # return jsonify(testdict)
    return testdict
    # return jsonify(radius_search_function(lat, long, radius))


# print(points_inside_radius)

if __name__ == "__main__":
    app.run(debug=True)
