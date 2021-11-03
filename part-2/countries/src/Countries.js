import React from 'react'
import SingleCountry from './SingleCountry'
import Display from './Display'

const Countries = ({ countries }) => {
    if(countries.length > 10) 
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    if (countries.length > 1 && countries.length <= 10) 
        return (
            <>
                {countries.map(c => (
                    <Display key={c.altSpellings} country={c}/>
                ))}
            </>
        )
    if(countries.length === 1)
        return (
            <SingleCountry country={countries[0]}/>
        )
    return (
        <div>no countries found</div>
    )
}

export default Countries