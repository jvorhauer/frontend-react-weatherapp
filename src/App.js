import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchBar from "./components/searchBar/SearchBar";
import TabBarMenu from "./components/tabBarMenu/TabBarMenu";
import MetricSlider from "./components/metricSlider/MetricSlider";
import ForecastTab from "./pages/forecastTab/ForecastTab";
import axios from "axios";
import "./App.css";
import TodayTab from "./pages/todayTab/TodayTab";
import kelvinToCelcius from "./helpers/kelvinToCelcius";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setError(false);
      try {
        const result = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location},nl&appid=${process.env.REACT_APP_API_KEY}&lang=nl`
        );
        setWeatherData(result.data);
      } catch (e) {
        console.error(e);
        setError(true);
      }
    }

    if (location) {
      fetchData();
    }
  }, [location]);

  return (
    <>
      <div className="weather-container">
        {/*HEADER -------------------- */}
        <div className="weather-header">
          <SearchBar setLocationHandler={setLocation} />

          {error && (
            <span className="wrong-location-error">
              Oeps! Deze locatie bestaat niet
            </span>
          )}

          <span className="location-details">
            {weatherData && (
              <>
                <h2>{weatherData.weather[0].description}</h2>
                <h3>{weatherData.name}</h3>
                <h1>{kelvinToCelcius(weatherData.main.temp)}</h1>
              </>
            )}
          </span>
        </div>

        {/*CONTENT ------------------ */}
        <div className="weather-content">
          <Router>
            <TabBarMenu />

            <div className="tab-wrapper">
              <Switch>
                <Route exact path="/">
                  <TodayTab coordinates={weatherData && weatherData.coord} />
                </Route>
                <Route path="/komende-week">
                  <ForecastTab coordinates={weatherData && weatherData.coord} />
                </Route>
              </Switch>
            </div>
          </Router>
        </div>

        <MetricSlider />
      </div>
    </>
  );
}

export default App;
