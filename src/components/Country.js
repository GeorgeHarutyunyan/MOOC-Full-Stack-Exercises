import React, {useState} from 'react'
import axios from 'axios'

const Country = ({data,singleEntryCheck}) => {

    const [expandedView,setExpandedView] = useState(singleEntryCheck)
    const [weather, setWeather] = useState({})
 
    const handleShowChange = () => {
        setExpandedView(!expandedView)
    }

    const getWeatherAPI = () => { //self note, do not return the jsx here as axios only returns a promise! As such, I used a secondary function
        return axios.get(`http://api.weatherstack.com/current?access_key=f4279dd8055b9298ce68bd2129651305&query=${data.capital}`)
            .then(response => response.data
            )
            .then(weatherData => {
                const weatherDataObject = {
                    temperature: weatherData.current.temperature,
                    weather_icon: weatherData.current.weather_icons[0],
                    wind_speed: weatherData.current.wind_speed,
                    wind_dir: weatherData.current.wind_dir
                }
                setWeather(weatherDataObject)
            }
            )
    }
    

    if (expandedView) {
        getWeatherAPI()
        console.log('okay a requst..?')
        if (singleEntryCheck) {
            return (
                <div>
                    <h1>{data.name}</h1>
                    <div>
                        Capital: {data.capital}<br/>
                        Population: {data.population}
                        <h2>Languages</h2>
                        <ul>
                            {data.languages.map(language => <li key={language.name}>{language.name}</li>)}
                        </ul>
                    </div>
                    <img src={data.flag} alt={`Flag of ${data.name}`} width='150' height='100' />
                    <div>
                        <h3>Weather in {data.capital}</h3>
                        <h5>temperature: {weather.temperature}</h5>
                        <img src={weather.weather_icon} alt={`Temperature in ${data.capital}`}/>
                        <h5>wind: {weather.wind_speed} km/h direction {weather.wind_dir} </h5> 
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <p>{data.name} <button onClick={handleShowChange}>Show</button></p>
                    <h1>{data.name}</h1>
                    <div>
                        Capital: {data.capital}<br/>
                        Population: {data.population}
                        <h2>Languages</h2>
                        <ul>
                            {data.languages.map(language => <li key={language.name}>{language.name}</li>)}
                        </ul>
                    </div>
                    <img src={data.flag} alt={`Flag of ${data.name}`} width='150' height='100' />
                    <div>
                        <h3>Weather in {data.capital}</h3>
                        <h5>temperature: {weather.temperature}</h5>
                        <img src={weather.weather_icon} alt={`Temperature in ${data.capital}`}/>
                        <h5>wind: {weather.wind_speed} km/h direction {weather.wind_dir}</h5>
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
            <div>
                <p>{data.name} <button onClick={handleShowChange}>Show</button></p>
            </div>
        </div>
   )

}

export default Country