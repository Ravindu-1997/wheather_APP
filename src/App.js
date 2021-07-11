import React, { useState } from "react";
import "./App.css";
const api = {
  key: "efddc035cadf78d2744992617a60b7bf",
  base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const getQuery = (query) => {
    console.log(query);
    setQuery(query);
  };
  const search = (evt) => {
    console.log("inside search");
    if (evt.key === "Enter") {
      // fetch("${api.base)weather?q=${query}&units=metric&APPID=${api.key}")
      //   .then((res) => res.json())
      //   .then((result) => {
      //     // setWeather(result);
      //     // setQuery("");
      //     console.log("I came here");
      //     console.log(result);
      //   });
      console.log("Enter detected");
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setWeather(data);
          setQuery("");
        })
        .catch((err) => console.log("Something went wrong ", err));
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    //return ${day} ${date} ${month} ${year}
    return day + " " + date + " " + month + " " + year;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 10
            ? "app.warm"
            : "app"
          : "app"
      }
    >
      <div className="app warm">
        <main>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={(e) => getQuery(e.target.value)}
              value={query}
              onKeyPress={(e) => search(e)}
            />
          </div>
          {typeof weather.main != "undefined" ? (
            <div>
              <div className="location-box">
                <div className="location">
                  {weather.name},{weather.sys.country}
                </div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  {Math.round(weather.main.temp)}
                  <sup>o</sup>C
                </div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div>
          ) : (
            ""
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
