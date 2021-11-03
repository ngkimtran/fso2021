import React, { useState, useEffect } from 'react'
import axios from 'axios'

const key = process.env.REACT_APP_API_KEY

const SingleCountry = ({ country }) => {
    const [weather, setWeather] = useState()
    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${key}&query=${country.name.common}`)
        .then(response => setWeather(response.data.current))
    }, [country.name.common])

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>
                <span>capital</span> <span>{country.capital}</span>
            </div>
            <div>
                <span>population</span> <span>{country.population}</span>
            </div>
            <div>
                <h3>languages</h3>
                <ul>
                    {Object.keys(country.languages).map(key => (
                        <li key={key}>{country.languages[key]}</li> 
                    ))}
                </ul>
            </div>
            <div>
                <img src={country.flags.png} alt="" />
            </div>
            {weather && <div>
                <h3>{`Weather in ${country.capital}`}</h3>
                <p><strong>temperature:</strong> ${weather.temperature} Celcius</p>
                <img src={weather.weather_icons[0]} alt="" />
                <p><strong>wind:</strong> {weather.wind_speed} mph - direction {weather.wind_dir}</p>
            </div>}
        </div>
    )
}

export default SingleCountry
