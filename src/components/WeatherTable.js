import React from "react";

const WeatherTable = ({ weatherData }) => (
    <div className="weather-table">
        {weatherData.map((item, index) => (
            <div key={index} className="weather-column">
                <div className="date-header">
                    Date:{" "}
                    {new Date(item.dt_txt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })}
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Min</th>
                            <th>Max</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>{item.main.temp_min}°C</th>
                            <th>{item.main.temp_max}°C</th>
                        </tr>
                        <tr>
                            <td>Pressure</td>
                            <td>{item.main.pressure} hPa</td>
                        </tr>
                        <tr>
                            <td>Humidity</td>
                            <td>{item.main.humidity}%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        ))}
    </div>
);

export default WeatherTable