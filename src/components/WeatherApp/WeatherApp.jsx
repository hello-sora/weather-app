import React, {useState} from 'react';
import './WeatherApp.css';
import search_icon from '../assets/search.png'
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
  } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip
);

export const WeatherApp = () => {

    let api_key = "de73838e16734772b1125252242002";

    const [icon, setIcon] = useState();

    const [temperature, setTemperature] = useState();

    const [location, setLocation] = useState();

    const [temperatureList, setTemperatureList] = useState();

    const [labels, setLabels] = useState();

    const [condition, setCondition] = useState();

    let date = new Date();

    const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Average Temperature Over the Past Week',
          },
        },
      };

    const data = {
        labels,
        datasets: [
          {
            data: temperatureList,
            borderColor: 'rgb(179, 46, 124, 100)',
            backgroundColor: 'rgba(179, 46, 124, 100)',
          }
        ],
      };


    // Logic to fetch data from API and display to weather app
    const search = async () => {
        const element = document.getElementsByClassName("cityInput")
        if (element[0].value==="") // when input is empty
        {
            return 0;
        }

        // when input is not an empty value (inputting a city)
        let url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${element[0].value}&aqi=no`;

        let response = await fetch(url);
        let data = await response.json();

        // set icon, location, temperature, and condition
        setIcon(data.current.condition.icon);
        setLocation(data.location.name);
        setTemperature(data.current.temp_f + "°");
        setCondition(data.current.condition.text);
        createChart();
    }
    
    // Logic to fetch past 7 days from API and create average temperature chart
    const createChart = async () => {
        const element = document.getElementsByClassName("cityInput")
        let dataList = [];
        let labelList = [];
        while (dataList.length < 7) {
            labelList.push(parseInt(date.getMonth()+1) + "-"+ date.getDate() +"-"+ date.getFullYear());
            let label = date.getFullYear() + "-"+ parseInt(date.getMonth()+1) +"-"+ date.getDate();
            let url = `http://api.weatherapi.com/v1/history.json?key=${api_key}&q=${element[0].value}&dt=${label}`;
            let response = await fetch(url);
            let data = await response.json();
            dataList.push(data.forecast.forecastday[0].day.avgtemp_f);
            date.setDate(date.getDate() - 1);
        }
        dataList.reverse();
        labelList.reverse();
        setTemperatureList(dataList);
        setLabels(labelList);
    }


  return (
    // search bar
    <div className='container'>
        <div className="search-bar">
            <input type="text" className="cityInput" placeholder='Search'/>
            <div className="search-icon" onClick={()=>{search()}}> 
                <img src={search_icon} alt="" />
            </div>
        </div>
        {/* icon, location, temperature, condition, and chart */}
        {temperatureList && <div className=""><div>
            {icon && <img className="weather-icon" src={icon} alt=""/>}
        </div>
        <div className="weather-location"> {location} </div>
        <div className="weather-temperature"> {temperature} </div>
        <div className="weather-condition"> {condition} </div>
        <div className="chart">
            {temperatureList && <Line options={options} data={data} />}
        </div></div>}
    </div>
  )
}

export default WeatherApp
