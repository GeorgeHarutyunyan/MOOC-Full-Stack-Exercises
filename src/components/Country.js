import React, {useState} from 'react'
import axios from 'axios'

const Country = ({data,singleEntryCheck}) => {

    const [expandedView,setExpandedView] = useState(singleEntryCheck)
    console.log(singleEntryCheck)

    const handleShowChange = () => {
        setExpandedView(!expandedView)
    }

    const getWeatherAPI = () => { //self note, do not return the jsx here as axios only returns a promise! As such, I used a secondary function
        axios.get(`http://api.weatherstack.com/current?access_key=f4279dd8055b9298ce68bd2129651305&query=${data.capital}`)
        .then(response => {
            console.log("request is sent")
            console.log(response)
            return response.data
        }
        )
    }

    const parseWeatherData = (data) => (
        <div>            
            <h3>Weather in {data.capital}</h3>
            <h5>temperature: {data.current.temperature}</h5>
            <img src={data.current.weather_icons[0]} alt={`Temperature in ${data.capital}`}/>
            <h5>wind: </h5> {data.current.wind_speed} km/h direction {data.current.wind_dir}
        </div>
    )

    if (expandedView) {
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
                    <img src={data.flag} alt={`Flag of ${data.name}`} width='150'  height='100'/>
                    {getWeatherAPI().then(data => parseWeatherData(data))}
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
                    <img src={data.flag} alt={`Flag of ${data.name}`} width='150'  height='100'/>
                    {getWeatherAPI().then(data => parseWeatherData(data))}
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