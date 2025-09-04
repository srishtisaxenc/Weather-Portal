
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import './Style/HourlyForecast.css'


const HourlyForecast = ({ city }) => {
  const [hourlyData, setHourlyData] = useState([]);

  useEffect(() => {
    const fetchHourlyData = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=9affe4b12aac445093672630251308&q=${city}&days=1&aqi=no&alerts=no`
        );
        setHourlyData(response.data.forecast.forecastday[0].hour);
      } catch (error) {
        console.error("Error fetching hourly forecast:", error);
      }
    };
    if (city) fetchHourlyData();
  }, [city]);

  const formatCityName = (name) =>
    name ? name.charAt(0).toUpperCase() + name.slice(1) : "";

  // Get current hour in 12-hour format
  const now = new Date();
  const currentHour = now.getHours() % 12 || 12;
  const currentAmPm = now.getHours() >= 12 ? "PM" : "AM";

  return (
    <div className="container mt-4">
      <h4 className="mb-3">
        Hourly Forecast{city && ` - ${formatCityName(city)}`}
      </h4>
      <div className="d-flex overflow-auto flex-nowrap">
        {hourlyData.map((hour, index) => {
          const timeStr = hour?.time?.split(" ")[1] || "--";
          const [hr, min] = timeStr.split(":");
          let hourVal = parseInt(hr, 10);
          const ampm = hourVal >= 12 ? "PM" : "AM";
          const displayHour = hourVal % 12 || 12;

          const isCurrent = displayHour === currentHour && ampm === currentAmPm;

          return (
            <div
              key={index}
              className={`card text-center mx-2 ${isCurrent ? "highlight" : ""}`}
              style={{
                minWidth: "140px",
                flex: "0 0 auto",
                borderRadius: "15px",
              }}
            >
              <div className="card-body p-3" style={{ position: "relative", zIndex: 1 }}>
                <h6 className="card-title mb-2">{`${displayHour}:${min} ${ampm}`}</h6>
                <img
                  src={hour?.condition?.icon}
                  alt={hour?.condition?.text || "weather icon"}
                  style={{ width: "50px", height: "50px" }}
                  className="mb-2"
                />
                <p className="mb-1 fw-bold">{hour?.temp_c}°C</p>
                <p className="text-muted small mb-0">{hour?.condition?.text}</p>
                <p className="text-muted small mb-0">
                  <i className="bi bi-moisture"></i> {hour?.humidity ?? "--"}
                </p>
                <p className="text-muted small mb-0">
                  <i className="bi bi-cloud-rain-fill"></i> {hour?.chance_of_rain ?? 0}%
                </p>

                {/* Rain animation */}
                {hour?.will_it_rain === 1 && (
                  <div className="rain-animation">
                    {[...Array(10)].map((_, i) => (
                      <span
                        key={i}
                        className="drop"
                        style={{
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random()}s`,
                        }}
                      ></span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;


