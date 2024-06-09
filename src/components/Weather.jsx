import React, { useEffect, useState } from 'react';
import city from '../Images/city.jpg';
import background from '../Images/background.jpg';
import { FaSearch } from "react-icons/fa";
import axios from 'axios';

const Weather = () => {
  const [cityName, setCityName] = useState('');
  const [weather, setWeather] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const handleInput = (e) => {
    setCityName(e.target.value);
  };

  useEffect(() => {
    if (cityName) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a63170d53047add4fe24c91c1d00c896&units=metric`)
        .then((res) => {
          console.log(res.data);
          setWeather(res.data);
        })
        .catch((error) => {
          console.log(error);
          setWeather(null);
        });
    } else {
      setWeather(null);
    }
  }, [cityName]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString();
  };

  return (
    <div className="flex w-full h-screen font-sans">
      <div className="relative w-[60%]">
        <img
          src={city}
          alt="weather Image"
          className="bg-cover h-full w-full"
        />
        <div className="absolute bottom-0 left-0 px-5 mb-5 text-white text-4xl">
          <p>{formatTime(currentTime)}</p>
          <p className="text-xl">{formatDate(currentTime)}</p>
        </div>
        {weather && (
          <p className="absolute bottom-0 right-0 text-white text-6xl mr-10 mb-8">
            {weather.main.temp}
            <span className="text-5xl">°C</span>
          </p>
        )}
      </div>

      <div className="relative w-[40%]">
        <img
          src={background}
          alt="background Image"
          className="bg-cover h-full w-full"
        />
        <div className="absolute top-0 w-full h-full bg-gray-900 bg-opacity-50 flex flex-col justify-center items-center text-white">
          <div className="text-5xl">
            {weather ? weather.weather[0].description : 'Haze'}
            <hr className="border-t border-gray-300 max-w-full mt-2" />
          </div>

          <div className="flex flex-row mt-10">
            <div className="flex">
              <input
                type="text"
                placeholder="Search any City"
                className="bg-opacity-50 bg-gray-700 text-white px-3 py-2 rounded-l-lg focus:outline-none"
                onChange={handleInput}
              />
              <button className="bg-opacity-50 bg-gray-700 text-white px-3 py-2 rounded-r-lg">
                <FaSearch />
              </button>
            </div>
          </div>

          <div className="flex flex-row mt-10 text-2xl font-bold">
            {cityName}
          </div>

          {weather && (
            <>
              <div className="mt-4 flex justify-between gap-24 text-xl">
                <p>Temperature</p>
                <p>{weather.main.temp} °C</p>
              </div>

              <div className="mt-4 flex justify-between gap-24 text-xl">
                <p>Humidity</p>
                <p>{weather.main.humidity} %</p>
              </div>

              <div className="mt-4 flex justify-between gap-24 text-xl">
                <p>Visibility</p>
                <p>{weather.visibility / 1000} km</p>
              </div>

              <div className="mt-4 flex justify-between gap-24 text-xl">
                <p>Wind Speed</p>
                <p>{weather.wind.speed} km/h</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather;
