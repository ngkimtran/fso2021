import React, { useState } from 'react'
import SingleCountry from './SingleCountry'

const Display = ({ country }) => {
    const [display, setDisplay] = useState(false)

    const handleDisplay = () => {
        setDisplay(!display)
    }

    return (
        <div>
            <span>{country.name.common}</span>{" "}
            <button onClick={handleDisplay}>show</button>
            {display && <SingleCountry country={country}/>}
        </div>
    )
}

export default Display
