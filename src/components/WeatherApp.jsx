import axios from "axios";
import React, { useEffect, useState } from "react";

function WeatherApp() {

  const [city,setChangeCity]=useState('')
  const [weather,setWeather] =useState(null)

  const handleInput =(e)=>{

    const changeValue = e.target.value;
    console.log(changeValue);

    setChangeCity(changeValue);


  }
    
  useEffect(()=>{

axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a63170d53047add4fe24c91c1d00c896&units=metric`)
.then((res)=>{
  console.log(res.data)
  setWeather(res.data)
})
.catch((error)=>{
  console.log(error)
})
  },[city])


  return (
    <>
      <div className=" font-mono bg-slate-100 flex justify-center items-center h-screen ">
        <div className=" bg-[#A0B7DC] md:w-1/4 w-full  md:h-3/5 h-3/4 rounded-xl">
          <div className="flex justify-center py-4">
            <input
              type="text"
              placeholder="type any city "
              className="rounded-full p-2"
              onChange={handleInput}
            />
          </div>

          <div className="flex justify-center items-center h-1/2 overflow-hidden">
            <p className="text-4xl font-semibold break-words whitespace-normal text-center">{city}</p>
          </div>

          {weather && 
          <p className="flex justify-center items-center text-2xl font-bold">
            {weather.main.temp}
          </p>
          }
 </div>
      </div>
    </>
  );
}

export default WeatherApp;






// https://weather-app-orcin-eta-42.vercel.app/