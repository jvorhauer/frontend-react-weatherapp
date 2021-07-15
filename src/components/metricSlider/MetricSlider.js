import React, {useState, useEffect, useContext} from 'react';
import {TempContext} from "../../context/TempContextProvider";
import './MetricSlider.css';

const MetricSlider = () => {

  const [celsius, setCelsiuss] = useState(localStorage.getItem("selmet") === "celsius");
  const {setCelsius, setFahrenheit} = useContext(TempContext);

  useEffect(() => {
    if (celsius) {
      setCelsius()
    } else {
      setFahrenheit()
    }
  }, [celsius]);

  return (
    <div className="weather-container-extension">
      Weergeven in
      <p className="switch-label">&deg; C</p>
      <span className="switch-wrapper">
        <input
          type="checkbox"
          className="switch"
          id="metric-system"
          checked={!celsius}
          onChange={() => setCelsiuss(!celsius)}
        />
        <label htmlFor="metric-system" className="switch-btn" />
      </span>
      <p className="switch-label">&deg; F</p>
    </div>
  );
};

export default MetricSlider;
