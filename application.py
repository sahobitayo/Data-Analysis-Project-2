import os
import pandas as pd
import json
import datetime as dt

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session,sessionmaker
from sqlalchemy import create_engine, distinct, func, inspect
from sqlalchemy import MetaData,Table,Column
# import BubbleUtilities

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from config import ServerName, UserName, Password, DataBase

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL','') or f"postgres://{UserName}:{Password}@localhost:5432/{DataBase}"
db = SQLAlchemy(app)
# engine = create_engine("postgres://{UserName}:{Password}@localhost:5432/{DataBase}")


# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
code = Base.classes.code
earthquakes = Base.classes.earthquakes
emissions = Base.classes.emissions
eruptions = Base.classes.eruptions


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

#home route
@app.route("/earthquake")
def allearthquakes():
    """Return all the earthquake data"""
    session = Session(engine)
    data= session.query(earthquakes).find()
    # data= earthquakes.find()
    session.close()
    allearthquakes= list(data)
    for earthquakes in data:
        allearthquakes.append(earthquakes)

        return jsonify(allearthquakes)

@app.route("/depth")
def depth():
    # Create our session 
    session = Session(engine)

    """Return magnitude and depth"""
    # Query all dates for magnitudes and depth
    # Get start and end dates and convert to yyyy-mm-dd format for the query
    # start_date = dt.datetime.strptime(start, '%Y-%m-%d')
 
    results = session.query(earthquakes.mag, earthquakes.depth, earthquakes.date).all()

    session.close()

    # Create a dictionary and append to a list of magnitude and depth
    mag_depth = []
    for mag, depth, date in results:
        row = {}
        row["mag"] = mag
        row["depth"] = depth
        row["date"] = date
        mag_depth.append(row)

    return jsonify(mag_depth)

@app.route("/about")
def about():
    """Return the about page."""
    return render_template("about.html")

# on of the routes has to be an API route that lat, long, radius...week 10 day 3 activity 8(variable rule)


if __name__ == "__main__":
    app.debug = False
    app.run()