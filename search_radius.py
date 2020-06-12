import geopandas as gpd
import geojsonio

# %matplotlib inline
import pandas as pd
import geopandas as gp
import numpy as np
import matplotlib.pyplot as plt
from shapely.geometry import Point
from flask import Flask, jsonify

# From Jupyter Notebook Code
# Read in geojson file
########################################################################
data = gpd.read_file("static/js/earthquakes_data_json.geojson")
######################################################################
# Create dataframe 
df = pd.DataFrame(data)

# df.head()

# create Geometry series with lat / longitude
geometry = [Point(xy) for xy in (df.geometry)]


# df = df.drop(['Longitude', 'Latitude'], axis = 1)

# Create GeoDataFrame
points = gp.GeoDataFrame(df, crs=None, geometry=geometry)

# Create Matplotlib figure
# fig, ax = plt.subplots()

# Set Axes to equal (otherwise plot looks weird)
# ax.set_aspect('equal')

# Plot GeoDataFrame on Axis ax
# points.plot(ax=ax,marker='o', color='red', markersize=5)

# Create new point   
center_coord = [Point(-109.1, 43.8)]  # Insert Lat and Long here
center = gp.GeoDataFrame(crs=None, geometry=center_coord)

# Plot new point
# center.plot(ax=ax,color = 'blue',markersize=5)
# Buffer point and plot it
circle = gp.GeoDataFrame(crs=None, geometry=center.buffer(10.0))  # Insert radius here

# circle.plot(color = 'blue',ax=ax)
#########################################################
# Calculate the points inside the circle 

pointsinside = gp.sjoin(points,circle,how="inner")
# print(pointsinside)
# pointsinside.type


# Now the points outside the circle is just the difference 
# between  points and points inside (see the ~)

pointsoutside = points[~points.index.isin(pointsinside.index)]


# # Create a nice plot 
# fig, ax = plt.subplots()
# ax.set_aspect('equal')
# circle.plot(color = 'white',ax=ax)
# center.plot(ax=ax,color = 'blue',markersize=5)
# pointsinside.plot(ax=ax,marker='o', color='green', markersize=5)

# pointsoutside.plot(ax=ax,marker='o', color='yellow', markersize=5)

# print('Total points:' ,len(points))
# print('Points inside circle:' ,len(pointsinside))
# print('Points outside circle:' ,len(pointsoutside))

########################################################################

pointsinside.apply(lambda x: x.name).to_dict()

# pointsinside["geometry"]

pointsinside['lat'] = pointsinside['geometry'].y
pointsinside['long'] = pointsinside['geometry'].x
# pointsinside

# print(pointsinside.to_dict('records'))

points_inside_radius = pointsinside.to_dict('records')

# print(points_inside_radius)

# ask the user for lat and long, and radius
# 2: manipulation from above to get the pointsinside
# turn pointsinside dict into a json 
# serve as a json/api and consume in javascript 

# do all of this inside app.py 


# justice_league_members = [
#     {"superhero": "Aquaman", "real_name": "Arthur Curry"},
#     {"superhero": "Batman", "real_name": "Bruce Wayne"},
#     {"superhero": "Cyborg", "real_name": "Victor Stone"},
#     {"superhero": "Flash", "real_name": "Barry Allen"},
#     {"superhero": "Green Lantern", "real_name": "Hal Jordan"},
#     {"superhero": "Superman", "real_name": "Clark Kent/Kal-El"},
#     {"superhero": "Wonder Woman", "real_name": "Princess Diana"}
# ]

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/api/v1.0/points-inside")
def justice_league():
    """Return the points inside radius data as json"""

    return jsonify(points_inside_radius)

print(points_inside_radius)