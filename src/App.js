import React, { useState, useEffect } from "react";
import {HashRouter as Router,Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";

import Navbar1 from "./Component/NavBar1";
import WeatherCurrent from "./Component/WeatherCurrent";
import WeatherForecast from "./Component/WeatherForecast ";

import HourlyForecast from "./Component/HourlyForecast ";
import LocationDetector from "./Component/LocationDetector";


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import HistoricalWeatherFetcher from "./Component/HistoricalWeatherFetcher";
import Register from "./Component/User/Register";
import Login from "./Component/User/Login";
import './Component/Style/LoginPage.css'
import PasswordReset from "./Component/User/PasswordReset";
// import UserProvider from "./Component/ContextApi/UserProvider";



function App() {
  const [city, setCity] = useState(null);


  const navigate = useNavigate();     // to navigate programmatically

  const location = useLocation();
  const emailid = location.state?.emailid || "";          // safe check

 

  const handleSearch = (query) => {
    console.log("city - " + query);

    setCity(query);
    if (sessionStorage.getItem('setIsLoggedIn')) {
      navigate("/home");
    } else {
      navigate('/');

    }       // Navigate back to main weather view
  };


  return (
    <>
      <Routes>

      <Route path="/register" element={<Register />} />


      <Route path="/" element={<Login />} />
       



        {/* Weather Home Page */}
        <Route
          path="/home"
          element={
            sessionStorage.getItem('setIsLoggedIn') === 'true' ? (
              <>
                {window.location.pathname !== "/index.html"  && <Navbar1 onSearch={handleSearch} emailid={emailid} />}
                {!city && <LocationDetector onLocationDetected={setCity} />}

                {window.location.pathname !== "/"  && <Navbar1 onSearch={handleSearch} emailid={emailid} />}

                {city ? (

                  <>

                    {/* {window.location.pathname !== "/" && <Navbar1 onSearch={handleSearch} emailid={emailid} />} */}
                    <WeatherCurrent city={city} />
                    <HourlyForecast city={city} />
                    <WeatherForecast city={city} />
                    {/* History Page (if needed) */}


                  </>
                ) : (
                  <div className="text-center mt-5">
                    <h3>Detecting Location....</h3>
                    <div className="spinner-border text-primary" role="status"></div>
                  </div>
                )}

              </>
            ) : (<Navigate to="/" replace />)
          }
        />

        <Route path="/history" element={
          sessionStorage.getItem('setIsLoggedIn') === 'true' ? (<><HistoricalWeatherFetcher /> </>) : (<Navigate to="/" replace />)
        }
        />


        {/* Reset Password Page */}
        <Route path="/resetpassword" element={<div className="text-center mt-5"><PasswordReset /></div>} />


      </Routes>

     

    </>
  );
}

export default App;


//--------------------------------------------------------------------------------
