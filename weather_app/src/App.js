import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
function App() {
  const api = {
    url: "https://api.openweathermap.org/data/2.5/weather",
    key: "8050fdf03443d02dbeeadadc2ab9fe8a",
  };
  const [city, setCity] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState();
  const [sendData, setSendData] = useState();
  const [flag, setFlag] = useState(false);
  const [history, setHistory] = useState([]);
  let searchHistory = [];
  function onSubmit(e) {
    e.preventDefault();
    if (history.length >= 5) {
      history.shift();
      history.push(data.name);
    } else {
      history.push(data.name);
    }
    setHistory(history);
    setSendData(city);
    // console.log(history);
  }
  useEffect(() => {
    fetch(`${api.url}?q=${city}&appid=${api.key}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (Data) {
        // console.log(Data);
        if (Data.cod !== "400" && Data.cod !== "404") {
          setData(Data);
          setError("");
          setFlag(false);
        } else {
          setError(Data.message);
          setData("");
          Data.cod !== 404 && setFlag(true);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, [sendData]);

  return (
    <div className="App">
      <h2>Weather App</h2>
      <form>
        <input
          value={city}
          placeholder={"Enter City Name"}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        ></input>
        <button onClick={onSubmit}>Search</button>
      </form>
      {data && !error ? (
        <div className="data_container">
          <p className="city">Weather of City: {data.name}</p>
          <p className="currentTemp">Current Temp Of City:{data.main.temp}°C</p>
          <p className="tempRange">
            Temperature Range: {data.main.temp_min}~{data.main.temp_max}°C
          </p>
          <p className="humidity">Humidity: {data.main.humidity}</p>
          <p className="seaLevel">Visibility : {data.visibility}mtr</p>
          <p className="ground_level">Ground Level: {data.coord.lat}</p>
        </div>
      ) : (
        ""
      )}
      {error && <p className="Error_container">{error}</p>}
      {flag ? (
        <div>
          <h3>Search history--(Last-3)</h3>
          {history.map((elm, indx) => {
            return <p key={indx}>{elm}</p>;
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
