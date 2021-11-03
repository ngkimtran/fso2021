import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './Filter'
import Countries from './Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchParam, setSearchParam] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data.filter(c => c.name.common.toLowerCase().includes(searchParam.toLowerCase()))))
  }, [searchParam]);

  const handleChange = (e) => {
    setSearchParam(e.target.value)
  }

  return (
    <>
      <Filter searchParam={searchParam} handleChange={handleChange} />
      <Countries countries={countries} />
    </>
  )
}

export default App