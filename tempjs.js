const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Define endpoint to fetch earthquake data
app.get('/earthquake', async (req, res) => {
  try {
    // Fetch earthquake data from USGS API
    const response = await axios.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson');

    // Format the response data
    const earthquakes = response.data.features.map(feature => ({
      magnitude: feature.properties.mag,
      location: feature.properties.place,
      time: new Date(feature.properties.time),
      coordinates: feature.geometry.coordinates
    }));

    // Send JSON response with earthquake data
    res.json({ earthquakes });
  } catch (error) {
    console.error('Error fetching earthquake data:', error);
    res.status(500).json({ error: 'Unable to fetch earthquake data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
