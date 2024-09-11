import React, { useState } from "react";
import axios from "axios";
import "../App.css"; 
import WeatherTable from "./WeatherTable";

const apiKey = "1635890035cbba097fd5c26c8ea672a1";

const WeatherApp = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getWeatherData = async () => {
        if (!city) return; 

        setLoading(true);
        setError("");
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
            );
            const filteredData = response.data.list.filter(
                (_, index) => index % 8 === 0
            );
            setWeatherData(filteredData);
        } catch (error) {
            setError("Error fetching weather data. Please try again.");
        }
        setLoading(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            getWeatherData();
        }
    };

    return (
        <div className="weather-app">
            <h1>Weather in your city</h1>
            <div className="search-container">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter city name"
                    className="search-input"
                />
                <button onClick={getWeatherData} disabled={loading || !city.trim()}>
                    {loading ? "Loading..." : "Search"}
                </button>
                {error && <div className="error-message">{error}</div>}
            </div>

            {weatherData.length > 0 && <WeatherTable weatherData={weatherData} />}
        </div>
    );
};

export default WeatherApp;
