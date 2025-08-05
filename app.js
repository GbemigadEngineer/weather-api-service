const express = require("express");
const { getWeather } = require("./services/weatherService");

const app = express();

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    const weather = await getWeather(city);
    res.json(weather);
  } catch (error) {
    console.error(" Error fetching weather", error.message);
    res.status(500).json({
      error: "Failed to fetch weather data",
    });
  }
});

module.exports = app;
