import React from 'react'

const Filter = ({ searchParam, handleChange }) => {
    return (
        <div>
            <span>find countries</span>{" "}
            <input type="text" value={searchParam} onChange={handleChange} />
        </div>
    )
}

export default Filter
