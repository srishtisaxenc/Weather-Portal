import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container } from 'react-bootstrap';




const WeatherForecast = ({city}) => {
  const [forecast, setForecast] = useState([]);


  const API_KEY = '9affe4b12aac445093672630251308';

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const res = await axios.get(`https://api.weatherapi.com/v1/forecast.json`, {
          params: {
            key: API_KEY,
            q: city,
            days: 7,
          },
        });
        setForecast(res.data.forecast.forecastday);
        console.log(res.data.forecast.forecastday);
        
      } catch (err) {
        console.error(err);
      }
    };

    fetchForecast();
  }, []);

  return (
    <Container className="my-4">
      <Card className="p-4 shadow">
        <h4 className="mb-4 text-center">7-Day Weather Forecast - {city}</h4>
        <div className="d-flex overflow-auto">
          {forecast.map((day, index) => (
            <Card key={index} className="mx-2 p-3 text-center shadow-sm" style={{ minWidth: '180px' }}>
              <h6 className="text-muted">{day.date}</h6>
              <img src={day.day.condition.icon} alt="weather-icon" width="50" />
              <h5><b>{day.day.avgtemp_c}</b> °C</h5>
              <p className="mb-0"><i class="bi bi-moisture"></i>  {day.day.avghumidity}%</p>
                <p className="mb-0"><i class="bi bi-cloud-drizzle"></i> {day.day.daily_chance_of_rain}%</p>
              <p className="mb-0 text-info" >{day.day.condition.text}</p>
            </Card>
          ))}
        </div>
      </Card>
    </Container>
  );
};

export default WeatherForecast;