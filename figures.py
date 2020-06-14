#!/usr/bin/env python
# coding: utf-8

# In[1]:


# Dependencies and Setup
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from plotly.offline import init_notebook_mode, iplot 
init_notebook_mode(connected=True)


# In[2]:


#read 
earthquakes_data = pd.read_csv('Data/earthquakes.csv')
earthquakes_data.head()


# In[3]:


earthquakes_data['date'] = earthquakes_data['date'].astype(str).str[:-4].astype(np.int64)
earthquakes_data


# In[4]:


fig = px.scatter(earthquakes_data, x="depth", y="mag", color="mag", hover_name="place", title="Magnitude Vs. Depth")
fig


# In[5]:



fig = px.scatter(earthquakes_data, x="mag", y="depth", animation_frame="date", animation_group="mag", title="Depth Vs. Magnitude",
           size="mag", color="mag", hover_name="place",
           log_x=True, size_max=55, range_x=[4.5,10], range_y=[0,160])

fig["layout"].pop("updatemenus") # optional, drop animation buttons
fig.show()


# In[6]:


earthquakes_data['date'] = earthquakes_data['date'] // 10 * 10

sub_earthquakes = earthquakes_data.query('date >= 1950')

fig = px.histogram(
  sub_earthquakes.query('mag < 200').sort_values('date'), title="Earthquakes Per Decade",
  x='mag',
  facet_col='date'
)
fig.show()


# In[ ]:




