import React, {createContext, useState} from 'react';
import kelvinToCelcius from "../helpers/kelvinToCelcius";
import kelvinToFahrenheit from "../helpers/kelvinToFahrenheit";

export const TempContext = createContext(null);

function TempContextProvider({ children }) {

  const KEY = "selmet";
  const [selectedMetric, setSelectedMetric] = useState(localStorage.getItem(KEY));

  function setCelsius() {
    setSelectedMetric('celsius');
    localStorage.setItem("selmet", "celsius");
    console.log("setCelsius", localStorage.getItem(KEY));
  }
  function setFahrenheit() {
    setSelectedMetric('fahrenheit');
    localStorage.setItem("selmet", "fahrenheit");
    console.log("setFahrenheit", localStorage.getItem(KEY));
  }

  return (
    <TempContext.Provider value={{
      setCelsius: setCelsius,
      setFahrenheit: setFahrenheit,
      kelvinToMetric: selectedMetric === 'celsius' ? kelvinToCelcius : kelvinToFahrenheit,
    }}>
      { children }
    </TempContext.Provider>
  )
}

export default TempContextProvider;
