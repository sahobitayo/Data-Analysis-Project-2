import geopandas as gpd
import geojsonio

# %matplotlib inline
import pandas as pd
import geopandas as gp
import numpy as np
import matplotlib.pyplot as plt
from shapely.geometry import Point
from flask import Flask, jsonify

def radius_search_function(lat, long, radius):
    print("Hello from a function")
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

    # Create new point   
    center_coord = [Point(long, lat)]  # Insert Lat and Long here
    center = gp.GeoDataFrame(crs=None, geometry=center_coord)

    # Plot new point
    # center.plot(ax=ax,color = 'blue',markersize=5)
    # Buffer point and plot it
    circle = gp.GeoDataFrame(crs=None, geometry=center.buffer(radius))  # Insert radius here ( 1 = 50 miles)

    # circle.plot(color = 'blue',ax=ax)
    #########################################################
    # Calculate the points inside the circle 

    pointsinside = gp.sjoin(points,circle,how="inner")
    # print(pointsinside)
    # pointsinside.type


    # Now the points outside the circle is just the difference 

    pointsoutside = points[~points.index.isin(pointsinside.index)]

    pointsinside.apply(lambda x: x.name).to_dict()

    # pointsinside["geometry"]

    pointsinside['lat'] = pointsinside['geometry'].y
    pointsinside['long'] = pointsinside['geometry'].x
    # pointsinside

    # print(pointsinside.to_dict('records'))

    points_inside_radius = pointsinside.to_dict('records')
# ///////////////////////////////////////////////////////////////////
    # return(points_inside_radius)

    df = pointsinside
    df = df.drop(columns = ['index_right', 'lat', 'long'])
    df.to_file("output.geojson", driver="GeoJSON")
# def df_to_geojson(df, properties, lat='latitude', lon='longitude'):
#     geojson = {'type':'FeatureCollection', 'features':[]}
#     for _, row in df.iterrows():
#         feature = {'type':'Feature',
#                    'properties':{},
#                    'geometry':{'type':'Point',
#                                'coordinates':[]}}
#         feature['geometry']['coordinates'] = [row[lon],row[lat]]
#         for prop in properties:
#             feature['properties'][prop] = row[prop]
#         geojson['features'].append(feature)
#     return geojson
# print(points_inside_radius)
radius_search_function(lat, long, radius)
