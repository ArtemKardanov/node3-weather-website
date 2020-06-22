const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const PORT = process.env.PORT || 3000;

//Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

//Other part
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Artem K",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Ukraine",
    name: "Artem K",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "How i can help you?..",
    name: "Artem K",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.send({
      error: "You must provide an address term",
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("notFoundPage", {
    title: "404",
    errorMessage: "Help article not found",
    name: "Artem K",
  });
});

app.get("*", (req, res) => {
  res.render("notFoundPage", {
    title: " 404",
    errorMessage: "Page not found.",
    name: "Artem K",
  });
});

app.listen(PORT, () => {
  console.log("Sever is up on port " + PORT);
});
