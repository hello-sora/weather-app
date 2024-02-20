import React from 'react';
import './WeatherApp.css';
// import images
import cloudy_icon from '../assets/cloudy.png';
import light_rain_icon from '../assets/light-rain.png';
import rainy_icon from '../assets/rainy.png';
import search_icon from '../assets/search.png';
import snowy_icon from '../assets/snowy.png';
import sunny_icon from '../assets/sunny.png';
 

export const WeatherApp = () => {

    let api_key = "47a6e0f5529443f4a8a01439242002";

    // Logic to fetch data from API and display to weather app
    const search = async () => {
        const element =document.getElementsByClassName("cityInput")
        if (element[0].value==="") // when something is not going to execute
        {
            return 0;
        }
    }

  return (
    // search bar to search cities
    <div className='container'>
        <div className="search-bar">
            <input type="text" className="cityInput" placeholder='Search'/>
            <div className="search-icon" onClick={()=>{search()}}> 
                <img src={search_icon} alt="" />
            </div>
        </div>
        {/* weather, temperature, and location */}
        <div className="weather-image">
            <img src={cloudy_icon} alt="" />
        </div>
        <div className="weather-temperature">70°F</div>
        <div className="weather-location">Atlanta</div>
    </div>
  )
}

export default WeatherApp
