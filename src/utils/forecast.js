const request = require("request");

const KEY = "133ee05dc63611c48af060931096e31a";
const BASE_URL = "http://api.weatherstack.com/current";

const forecast = (latitude, longitude, callback) => {
  const url = `${BASE_URL}?access_key=${KEY}&query=${(latitude, longitude)}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!");
    } else if (response.body.error) {
      callback("Unable to find location");
    } else {
      const weather = response.body.current.weather_descriptions[0];
      const temperature = response.body.current.temperature;
      const feelLike = response.body.current.feelslike;
      callback(
        undefined,
        `${weather}. It feels like ${temperature}. Currently: ${feelLike}`
      );
    }
  });
};

module.exports = forecast;
