import React from 'react'

const Filter = ({searchParam, handleSearch}) => {
    return (
        <div>
            <p>filter shown with</p>
            <input 
                type='text' 
                onChange={handleSearch} 
                value={searchParam} 
            />
        </div>
    )
}

export default Filter
