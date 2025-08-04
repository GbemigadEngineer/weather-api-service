const axios = require("axios");
const redisClient = require("../utils/redisClient");

const API_KEY = process.env.WEATHER_API_KEY;
console.log("🔑 API KEY:", API_KEY);

async function getWeather(city) {
  // 1. Store city in lowercase format
  const cacheKey = city.toLowerCase();

  //   2. Check Redis cache if city data already exists

  const cached = await redisClient.get(cacheKey);
  if (cached) {
    console.log(`Cache hit for ${city}`);
    return JSON.parse(cached);
  }
  //   3. If not cached fetch the data from visual crossing using axios
  console.log(`Fetching from API for ${city}`);
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${API_KEY}&unitGroup=metric&include=current`;
  const response = await axios.get(url);
  const weatherData = response.data;
  // 4. Cache the result i.e weatherData in Redis
  await redisClient.setEx(cacheKey, 43200, JSON.stringify(weatherData));

  //   5. Return response

  return weatherData;
}

// export getWeather

module.exports = { getWeather };
