import React from "react"
import { useState } from "react"
import axios from "axios";
import "./App.css"
import { Oval } from "react-loader-spinner";

function App() {
  const [input,setinput]=useState("");
const [weather,setweather]=useState({
  loading:false,
  data:{},
  error:false
})
const toDate=()=>{
  const months=[
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currdate=new Date();
  const date=`${currdate.getDate()} ${months[currdate.getMonth()]}`;
  return date;
}
const search=(event)=>{
if(event.key==="Enter"){
  setinput('')
  setweather({...weather,loading:true})
  axios.get('https://api.openweathermap.org/data/2.5/weather',{
params:{
  q:input,
  units:"metric",
  appid:"4a8d0af06ca3d6b3f9a3f73e09299295"
}
  })
  .then(res=>{
    console.log(res)
    setweather({data:res.data,loading:false,error:false})
  })
  .catch(err=>{
    setweather({...weather,data:{},error:true})
  });
}
}
  return (
    <>
      <div className="App">
        <h2>WEATHERIFY</h2>
        <div className="weather-app">
          <div className="city-search">
            <input type="text" className="city" placeholder="Enter the city" 
            onChange={(e)=>setinput(e.target.value)}
            onKeyDown={search}/>
          </div>
          {
            weather.loading&&(
              <Oval type="Oval" color="white" height={70} width={70}>
              </Oval>
            )
          }
          {
            weather.error&&(
              <div className="error-message">
                <span>CITY NOT FOUND</span>
              </div>
            )
          }
          {
            weather&&weather.data&&weather.data.main&&(
              <div>
                <div className="city-name">
                  <h2>{weather.data.name}
                    <span>
                      {weather.data.sys.country}
                    </span>
                  </h2>
                </div>
                <div className="date">
                  <span>{toDate()}</span>
                </div>
                <div className="icon-temp">
                  <img src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}alt="" />
                  {Math.round(weather.data.main.temp)}
                  <sup className="degree">&deg;C</sup>
                </div>
                <div className="des-wind">
                  <p>{weather.data.weather[0].description.toUpperCase()}</p>
                  <p>Wind Speed:{weather.data.wind.speed}</p>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default App
