import React, {useState, useEffect, useContext} from 'react';
import './ForecastTab.css';
import axios from 'axios';
import { TempContext } from "../../context/TempContextProvider";

function ForecastTab({coordinates}) {

  const { kelvinToMetric } = useContext(TempContext);

  const [forecasts, setForecasts] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setError(false);
      setLoading(true);
      try {
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,current,hourly&appid=${process.env.REACT_APP_API_KEY}&lang=nl`)
        setForecasts(result.data.daily.slice(1, 6));
      } catch (e) {
        console.error(e);
        setError(true);
      }
      setLoading(false);
    }

    if (coordinates) {
      fetchData();
    }
  }, [coordinates]);

  return (
    <div className="tab-wrapper">
      {loading && !error && (
        <span>Loading...</span>
      )}
      {error && (
        <span>Er is iets mis gegaan met het ophalen van de data</span>
      )}
      {forecasts && !loading && forecasts.map((forecast) => {
        return (
          <article className="forecast-day" key={forecast.dt}>
            <p className="day-description">{createDateString(forecast.dt)}</p>
            <section className="forecast-weather">
              <span>{kelvinToMetric(forecast.temp.day)}</span>
              <span className="weather-description">{forecast.weather[0].description}</span>
            </section>
          </article>
        )
      })}

      {!forecasts && !error && !loading && (
        <span className="no-forecast">
          Zoek eerst een lokatie om het weer voor deze week te bekijken
        </span>
      )}
    </div>
  );
}

function createDateString(timestamp) {
  const day = new Date(timestamp * 1000);
  return day.toLocaleDateString('nl-NL', {weekday: 'long'});
}

export default ForecastTab;
